import math
import scipy
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
      "artist": track["artist"],
      "duration": track["duration"],
      "name": track["name"], 
      "isLike": track["isLike"] 
    })
  return jsonify(output), 200


@app.route('/my', methods=['GET'])
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
      "artist": track["artist"],
      "duration": track["duration"],
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

@app.route('/reccomendation', methods=['GET'])
def get_recommend_tracks():
  header = request.headers.get('Authorization')
  token = decode_token(header)
  following = mongo.db.following.aggregate([ 
    {"$match": { "userId": ObjectId(token['identity']["_id"]) }},
    {"$sort": {"_id": -1}},
    {"$limit": 5},
    {"$lookup": {
         "from": "track",
         "localField": "songId",
         "foreignField": "_id",
         "as": "result"
      }
    },
    {"$project": { "genres": "$result.genres" }}])
  
  my_genres_song = []  
  for my_track in following:
    my_genres_song.append(my_track["genres"][0])
  
  #get cluster data at all songs
  my_tracks = []
  for out_track in mongo.db.track.find({}):
    distance_temp = []
    for my_song in my_genres_song:
      i = 0
      distance = 0
      for genre_name, genre_value in my_song.items():
        distance = distance + (genre_value - out_track["genres"][genre_name]) ** 2
        i = i + 1
      distance_temp.append(1 - math.sqrt(distance))
    
    rating_song = max(distance_temp)
    if(rating_song > 0.7 and rating_song != 1.0 ):
      my_tracks.append({ "_id": str(out_track["_id"]), 
        "artist": out_track["artist"],
        "duration": out_track["duration"],
        "name": out_track["name"], 
        "isLike": False 
      })

  return jsonify(my_tracks), 200