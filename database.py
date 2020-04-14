from flask import Flask
from flask_pymongo import PyMongo
import json

#class flask_pymongo.PyMongo(app=None, uri=None, *args, **kwargs)¶

#init_app(app, uri=None, *args, **kwargs)¶


app = Flask(__name__, template_folder = "Templates")
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)

@app.route("/")
def home_page():
    online_users = mongo.db.users.find({"online": True})
    return render_template("data.html", online_users=online_users)

x = {
    "userid": "",
    "summaries": [
        {"date":"",
        "time":"",
        "genre":"",
        "title":"",
        "summary":"",
        "url":""
        }
    ]
}

print(json.dumps(x))

