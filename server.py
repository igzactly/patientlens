from flask import Flask,render_template,request,json
import admin.admin_model as admin_model
from admin.admin import admin
#from opportunities.opportunities import opportunities
import base64
from flask_session import Session
from flask import session
import os

STATIC_FOLDER = 'templates/assets'


app = Flask(__name__,static_folder=STATIC_FOLDER)
app.register_blueprint(admin)
#app.register_blueprint(opportunities)



app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route('/')
@app.route('/login')
def login():
	#return render_template("login.html")
	return render_template("template.html")

@app.route('/dashboard')
def dashboard():
	return render_template("candidates.html")

if(__name__=='__main__'):
	app.run(host='0.0.0.0',port=5000,debug=True)
	