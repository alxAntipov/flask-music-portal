import os
import jwt
from flask import request, jsonify
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, decode_token)
from app import app, mongo, flask_bcrypt, jwt
from bson.objectid import ObjectId
from models.user import validate_user

@jwt.unauthorized_loader
def unauthorized_response(callback):
  return jsonify({
      'status': False,
      'message': 'Missing Authorization Header'
  }), 401


@app.route('/login', methods=['POST'])
def auth_user():
  data = validate_user(request.get_json())
  if data['status']:
    data = data['data']
    user = mongo.db.users.find_one({'login': data['login']})
    if user and flask_bcrypt.check_password_hash(user['password'], data['password']):
      del user['password']
      user['_id'] = str(user['_id'])
      user['token'] = create_access_token(identity=user)
      user['refresh'] = create_refresh_token(identity=user)
      return jsonify({'status': True, 
        'user': user}), 200
    else:
      return jsonify({'status': False, 
        'message': 'Неправильный логин или пароль'
        }), 401
  else:
    return jsonify({'status': False, 
      'message': 'Bad request parameters: {}'
      .format(data['message'])}), 400


@app.route('/register', methods=['POST'])
def register():
  data = validate_user(request.get_json())
  if data['status']:
    data = data['data']
    if(mongo.db.users.find_one({"login": data["login"]})):
      return jsonify({'status': False, 
        'message': 'Такой логин уже занят'
        }), 400
    else:
      data['password'] = flask_bcrypt.generate_password_hash(data['password'])
      mongo.db.users.insert_one(data)
      del data['password']
      data['_id'] = str(data['_id'])
      data['token'] = create_access_token(identity=data)
      data['refresh'] = create_refresh_token(identity=data)
      return jsonify({'status': True, 
          'user': data}), 200
  else:
    return jsonify({'status': False, 
      'message': 'Bad request parameters: {}'
      .format(data['message'])}), 400


@app.route('/refresh', methods=['POST'])
def refresh():
  ''' refresh token endpoint '''
  current_user = get_jwt_identity()
  ret = {
      'token': create_access_token(identity=current_user)
  }
  return jsonify({'ok': True, 'data': ret}), 200


@app.route('/current_user', methods=['GET'])
def user():
  header = request.headers.get('Authorization')
  token = decode_token(header)
  return jsonify({'ok': True, 'user': token['identity']}), 200
