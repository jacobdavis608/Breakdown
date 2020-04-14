from flask import Flask
from flask_pymongo import PyMongo

class flask_pymongo.PyMongo(app=None, uri=None, *args, **kwargs)¶

init_app(app, uri=None, *args, **kwargs)¶


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)

@app.route("/")
def home_page():
    online_users = mongo.db.users.find({"online": True})
    return render_template("index.html", online_users=online_users)

