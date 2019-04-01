from flask import jsonify
from flask import request, send_from_directory
from flask_jwt_extended import decode_token
from bson.objectid import ObjectId
from app import app, mongo

UPLOAD_FOLDER = "data/"

@app.route('/all', methods=['GET'])
def get_all_tracks():
  header = request.headers.get('Authorization')
  token = decode_token(header)
  tracks = mongo.db.track.aggregate([ 
    {"$lookup": { "from": "following", 
      "let": {"songId": "$_id"},
      "pipeline": [
        { "$match":
          { "$expr": 
            { "$and": 
              [ 
                { "$eq": [ "$songId", "$$songId" ] },
                { "$eq": [ ObjectId(token['identity']["_id"]),"$userId" ] }
              ]
            }
          }
        }
      ], "as": "result" } },
    {"$addFields": {"isLike": { "$toBool": {"$size": "$result"} } }},
    {"$project": { "genres": 0 }} ])
  output = []
  for track in tracks:
    output.append({ "_id": str(track["_id"]), 
      "artist": track["artist"] , 
      "name": track["name"], 
      "isLike": track["isLike"] 
    })
  return jsonify(output), 200


@app.route('/mySong', methods=['GET'])
def get_follow_tracks():
  header = request.headers.get('Authorization')
  token = decode_token(header)
  tracks = mongo.db.following.aggregate([ 
    {"$match": { "userId": ObjectId(token['identity']["_id"]) }},
    {"$addFields": {"isLike": True}},
    {"$sort": {"_id": -1}},
    {"$project": { "userId": 0 }}])
  output = []
  for track in tracks:
    output.append({ "_id": str(track["songId"]), 
      "artist": track["artist"] , 
      "name": track["name"], 
      "isLike": track["isLike"] 
    })
  return jsonify(output), 200

@app.route('/track/<id_track>', methods=['GET'])
def get_one_track(id_track):
  track = mongo.db.track
  t = track.find_one({'_id' : ObjectId(id_track)})
  if t:
    return send_from_directory(UPLOAD_FOLDER, t['path'], as_attachment=True)
  else:
    output = "No such name"
    return jsonify({'result' : output})

@app.route('/like', methods=['POST'])
def like_track():
  data = request.get_json()
  header = request.headers.get('Authorization')
  token = decode_token(header)
  data["songId"] = ObjectId(data['songId'])
  data["userId"] = ObjectId(token['identity']["_id"])
  if(data["isLike"]):
    del data["isLike"]
    if(mongo.db.following.find_one({"songId": data["songId"], "userId": data["userId"] })):
      return jsonify({'ok' : False}), 409
    else:
      mongo.db.following.insert_one(data)
    return jsonify({'ok' : True}), 200
  else:
    del data["isLike"]
    mongo.db.following.delete_one({"songId": data["songId"], "userId": data["userId"] })
    return jsonify({'ok' : True}), 200

