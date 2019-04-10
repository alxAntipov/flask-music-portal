# -*- coding: utf-8 -*-
import os
from flask import Flask
from flask_pymongo import PyMongo
import json
import datetime
from bson.objectid import ObjectId
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'music'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/music'
app.config['JWT_SECRET_KEY'] = 'secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=7)

mongo = PyMongo(app)
flask_bcrypt = Bcrypt(app)
jwt = JWTManager(app)

#import models
import controllers
import models
