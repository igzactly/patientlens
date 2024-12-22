from flask import Flask,render_template,request,json
import admin.admin_model as admin_model
from admin.admin import admin
#from opportunities.opportunities import opportunities
import base64
from flask_session import Session
from flask import session
import configparser
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
	return render_template("login.html")

@app.route('/dashboard')
def dashboard():
	return render_template("candidates.html")

config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".ini")))

if(__name__=='__main__'):
	app.config['MONGO_URI'] = config['DB']['DB_URI']
	app.config['ALLOWED_EXTENSIONS']=config['VALIDATIONS']['ALLOWED_EXTENSIONS']
	app.config["AZURE_STORAGE_CONNECTION_STRING"]=config["AZURE_CREDS"]["AZURE_STORAGE_CONNECTION_STRING"]
	app.config["AZURE_CONTAINER"]=config["AZURE_CREDS"]["AZURE_STORAGE_CONTAINER"]
	app.config["STORAGE_ACCOUNT_NAME"]=config["AZURE_CREDS"]["STORAGE_ACCOUNT_NAME"]
	app.config["STORAGE_ACCOUNT_KEY"]=config["AZURE_CREDS"]["STORAGE_ACCOUNT_KEY"]
	app.run(host='0.0.0.0',port=5000,debug=True)
