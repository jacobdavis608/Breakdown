import time
from flask import Flask, escape, request, make_response, jsonify
from pymongo import MongoClient


app = Flask(__name__)

#client = MongoClient("mongodb+srv://breakdown:FixUp_11!@cluster0-ezpqi.mongodb.net")
#db = client.breakdown



# Figure out how to get a "session" going in flask
# (maybe in another mongoDB collection) attach user number to username to user id
# 

#@app.route('/login', methods=['POST'])
#def login():    #url format: "https://localhost/display?user=0001&num_displayed=5"
#    return

@app.route('/')
def home():
    return "<h1>Test</h1>"

@app.route('/get_summaries', methods=['GET'])
def get_summaries(): #url format: "https://localhost/get_summaries?user=0001&start=0&end=10"
    user_id = "0000"
    start = -1
    end = -1
    if 'user' in request.args:
        user_id = request.args['user']
    
    if 'start' in request.args:
        start = int(request.args['start'])
        
    if 'end' in request.args:
        end = int(request.args['end'])

    #error handling
    if (start == -1): 
        print("No summary range given")
        return "<p>No valid summary range given</p>"
    elif (end == -1):
        print("No summary range given")
        return "<p>No valid summary range given</p>"
    elif (start > end):
        return "<p>No valid summary range given</p>"
    




    return "<h1>Breakdown API test</h1><p>Userid: {0}</p><p>Start: {1}</p><p>End: {2}</p>".format(user_id, start, end)
    
    
    #user_data = db.users.find_many({"id": "0001"}, 5).sort({x: -1})
    #for summary in user_data['summaries']:
    #    print(summary)
    #db.users.find_and_modify()

if __name__ == "__main__":
    app.run()