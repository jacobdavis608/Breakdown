import time
from flask import Flask, escape, request, make_response, jsonify
from pymongo import MongoClient


app = Flask(__name__)

client = MongoClient("mongodb+srv://breakdown:FixUp_11!@cluster0-ezpqi.mongodb.net")
db = client.breakdown

# Summary response format: 
# {
#    "summaries" : []
# }

@app.route('/')
def home():
    return "<h1>Welcome to Breakdown API</h1>"

@app.route('/get_summaries', methods=['GET'])  #TODO CHANGE THIS TO POST TO SECURE USERID parameter
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
        return {"summaries": []}
    elif (end == -1):
        print("No summary range given")
        return {"summaries": []}
    elif (start > end):
        return {"summaries": []}

    #get the user data
    user_data = db.users.find_one({"id" : user_id})

    #if user does not exist
    if user_data == None:
        return {"summaries": []} #if frontend receives empty array, print "No entries submitted"\
    else:
        num_summaries = len(user_data["summaries"])
        if (end > num_summaries):
            end = num_summaries
        if (start < 0):
            start = 0

        summaries = user_data["summaries"][num_summaries - end: num_summaries - start]
        summaries.reverse() #put them in chronological order

        response = {
            "summaries": summaries
        }
        return response


@app.route('/summarize', methods=['GET'])
def summarize():     #url format: "https://localhost/summarize?user=0002&url=blah blah blah"
    return 


if __name__ == "__main__":
    app.run()