import time
from flask import Flask, escape, request, make_response, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)

@app.route('/upload', methods=['GET'])
def upload():
    
    
    
    #if 'url' in request.args:
    