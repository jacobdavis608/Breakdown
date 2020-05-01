import time
import datetime
from flask import Flask, escape, request, make_response, jsonify
from pymongo import MongoClient
from summarize import PDFSummarizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
#   "success" : 0 or 1 #indicating whether the summarizer was successful
# }
#
#

@app.route('/')
def home():
    return "<h1>Welcome to Breakdown API</h1>"

@app.route('/get_summaries', methods=['GET']) 
def get_summaries():
    '''
    Get the summaries in the range [start:end] from latest to earliest uploaded,
    for the provided user id. Example web request:
        https://localhost/get_summaries?user=0001&start=0&end=10
    The above example fetches 10 summaries for the user_id 0001
    '''
    
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
        return jsonify(response)

@app.route('/summarize', methods=['GET'])
def summarize():
    '''
    Generate a new summary for the pdf at the supplied url, and store it in the database
    with the provided title associated with the provided user_id. Example web request:
        https://localhost/summarize?user=0002&title=TESTSUMMARY&url=https://arxiv.org/pdf/2004.05274.pdf
    The above will summarize the article provided from Arxiv and insert the summary into the
    database with the title TEST SUMMARY.
    '''
    
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
        return jsonify(response)
    
    if 'url' in request.args:
        url = request.args['url']
    else:
        return jsonify(response)
    
    if 'title' in request.args:
        title = request.args['title']
    else:
        return jsonify(response)

    # Initialize the summarizer with the url provided
    try:
        summarizer = PDFSummarizer(url)
    except:
        return jsonify(response)


    # Summarize the article and get the summarizer result
    summary = summarizer.naive_summarize()
    
    # Check whether the file was valid
    if summary['valid_file'] == 'n':
        summarizer.cleanup()
        return jsonify(response)
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

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)