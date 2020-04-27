import time
import datetime
from flask import Flask, escape, request, make_response, jsonify
from pymongo import MongoClient
from summarize import PDFSummarizer


app = Flask(__name__)

client = MongoClient("mongodb+srv://breakdown:FixUp_11!@cluster0-ezpqi.mongodb.net")
db = client.breakdown

# Summary response format for getting summaries: 
# {
#    "summaries" : [],
#     "total_summaries" : integer #so end of page would say "0 to 10 of 30 Entries" 

# }

# New summary response format:
#
# {
#   "valid" : 0 or 1 #indicating whether url provided was valid
#   "success" : 0 or 1 #indicating whether the summarizer was successful
# }
#
#

@app.route('/')
def home():
    return "<h1>Welcome to Breakdown API</h1>"

@app.route('/get_summaries', methods=['GET'])  #TODO CHANGE THIS TO POST TO SECURE USERID parameter
def get_summaries(): #url format: "https://localhost/get_summaries?user=0001&start=0&end=10"
    user_id = "0000"
    start = None
    end = None
    if 'user' in request.args:
        user_id = request.args['user']
    else:
        return {"summaries": [], "total_summaries": 0}
    
    if 'start' in request.args:
        start = int(request.args['start'])
    else:
        return {"summaries": [], "total_summaries": 0}
        
    if 'end' in request.args:
        end = int(request.args['end'])
    else:
        return {"summaries": [], "total_summaries": 0}

    if (start > end):
        return {"summaries": [], "total_summaries": 0}

    #get the user data
    user_data = db.users.find_one({"id" : user_id})

    #if user does not exist
    if user_data == None:
        return {"summaries": [], "total_summaries": 0} #if frontend receives empty array, print "No entries submitted"\
    else:
        num_summaries = len(user_data["summaries"])
        if (end > num_summaries):
            end = num_summaries
        if (start > num_summaries):
            start = 0
        if (start < 0):
            start = 0

        summaries = user_data["summaries"][num_summaries - end: num_summaries - start]
        summaries.reverse() #put them in chronological order

        response = {
            "summaries": summaries,
            "total_summaries": num_summaries
        }
        return response

@app.route('/summarize', methods=['GET'])
def summarize():   #url format: "https://localhost/summarize?user=0002&title&url=blah blah blah"
    #Parse URL arguments
    user_id = "0000"
    url = ""
    title = ""
    
    response = {
        "success": 0
    }

    if 'user' in request.args:
        user_id = request.args['user']
    else:
        return response
    
    if 'url' in request.args:
        url = request.args['url']
    else:
        return response
    
    if 'title' in request.args:
        title = request.args['title']
    else:
        return response

    print("Params: ")
    print(url)
    # Initialize the summarizer with the url provided
    try:
        summarizer = PDFSummarizer(url)
    except:
        return response


    # Summarize the article and get the summarizer result
    summary = summarizer.naive_summarize()
    
    # Check whether the file was valid
    if summary['valid_file'] == 'n':
        summarizer.cleanup()
        return response
    else: #summary is valid, insert into database
        date = datetime.datetime.now().strftime("%Y-%m-%d %I:%M:%S %p")
        new_db_entry = {
            "date": date,
            "genre": "Miscellaneous",
            "title": title, #user makes the title
            "summary": summary['content'],
            "url": url
        }
        summarizer.cleanup()
    
    #Make sure user_id is in the database
    user_data = db.users.find_one({"id" : user_id})
    if (user_data == None): #if user not present in database, create a user for them
        new_user = {
            "id": user_id,
            "summaries": [
                new_db_entry
            ]
        }
        
        db.users.insert(new_user)
        response['success'] = 1
    else:
        db.users.update({"id": user_id}, {'$push' : {'summaries': new_db_entry}})
        response['success'] = 1

    return response

if __name__ == "__main__":
    app.run(debug=True)