import time
from flask import Flask, escape, request, make_response, jsonify
from pymongo import MongoClient


app = Flask(__name__)

#client = MongoClient("mongodb+srv://breakdown:FixUp_11!@cluster0-ezpqi.mongodb.net")
#db = client.breakdown



# Figure out how to get a "session" going in flask
# (maybe in another mongoDB collection) attach user number to username to user id
# 

@app.route('/login', methods=['POST'])
def login():    #url format: "https://localhost/display?user=0001&num_displayed=5"
    return



@app.route('/get_summaries', methods=['GET'])
def get_summaries(): #url format: "https://localhost/get_summaries?user=0001&num_displayed=5"
    user_id = "0000"
    if 'user' in request.args:
        user_id = request.args['user']
    else:
        print("TEST")
    
    return "<h1>Breakdown API test</h1><p>{0}</p>".format(user_id)
    
    
    #user_data = db.users.find_many({"id": "0001"}, 5).sort({x: -1})
    #for summary in user_data['summaries']:
    #    print(summary)
    #db.users.find_and_modify()

    if __name__ == "__main__":
        app.run()