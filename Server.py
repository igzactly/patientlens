from flask import Flask,render_template,request,json
from flaskext.mysql import MySQL
import admin.admin_model as admin_model
from admin.admin import admin
from patient.patient import patient
from diagnosis.diagnosis import diagnosis
import os
import base64
STATIC_FOLDER = 'templates/includes/assets'

#this is a test comment

app = Flask(__name__,static_folder=STATIC_FOLDER)
app.register_blueprint(admin)
app.register_blueprint(patient)
app.register_blueprint(diagnosis)




@app.route('/')
@app.route('/login')
def login():
	return render_template("login.html")


@app.route('/doLogin',methods=['POST'])
def doLogin():
	try:
		data=request.form["postdata"]
		userData=json.loads(data[1:-1])
		response={"data":admin_model.doLogin(userData["loginType"], userData["userId"], userData["pass"]),"message":"Login Successful !"}
		print(userData)
		return json.dumps(response)
	except Exception as e:
		print(e.message, e.args)
		return False
	
if(__name__=='__main__'):
	app.run(debug=True)
