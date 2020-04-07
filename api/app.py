import time
from flask import Flask
import jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return {}

@app.route('login')
def login():
    '''Login credentials'''