from flask import Blueprint,render_template,request,jsonify
import json
#from admin.admin import admin
import opportunities.opportunities_model as opportunities_model
from flask import session
from flask import current_app
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from werkzeug.utils import secure_filename
import os

opportunities=Blueprint("opportunities",__name__,url_prefix="/opportunities")

#page Loaders
@opportunities.route("/")
def dashboard():
    return render_template("opportunities.html")
    # if(session.get('adminLoggedIn') is not None):
    #     return render_template("opportunities.html")
    # return render_template("login.html")





#operations
@opportunities.route("/getAllOpenOpportunities",methods=['POST'])
def getAllOpenOpportunities():
    response=jsonify(opportunities_model.getAllOpenOpportunities())
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    