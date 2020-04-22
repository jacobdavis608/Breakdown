import time
from flask import Flask, escape, request, make_response, jsonify
from pymongo import MongoClient


app = Flask(__name__)
#app.config["MONGO_URI"] = 
#mongo = PyMongo(app)


client = MongoClient("mongodb+srv://breakdown:FixUp_11!@cluster0-ezpqi.mongodb.net")
db = client.breakdown

@app.route('/get_summaries', methods=['GET'])
def get_summaries(): #url format: "https://localhost/display?user=0001&num_displayed=5"
    user_id = "0000"
    if 'user' in request.args:
        user_id = request.args['user']
    else:
        print("oof")
    
    user_data = db.users.find_many({"id": "0001"}, 5).sort({x: -1})

    #oldest_displayed

    for summary in user_data['summaries']:
        print(summary)
    

    db.users.find_and_modify()