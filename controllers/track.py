from flask import jsonify
from flask import request, send_from_directory

from bson.objectid import ObjectId
from app import app, mongo

UPLOAD_FOLDER = "data/"

@app.route('/tracks', methods=['GET'])
def get_all_tracks():
  print(request.headers)
  tracks = mongo.db.track
  output = []
  for track in tracks.find():
    output.append({ "_id": str(track["_id"]), "artist": track["artist"] , "name": track["name"]})
  return jsonify(output)

@app.route('/track/<id_track>', methods=['GET'])
def get_one_track(id_track):
  track = mongo.db.track
  t = track.find_one({'_id' : ObjectId(id_track)})
  print(t)
  if t:
    return send_from_directory(UPLOAD_FOLDER, t['path'], as_attachment=True)
  else:
    output = "No such name"
    return jsonify({'result' : output})
