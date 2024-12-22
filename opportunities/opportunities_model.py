from bson import ObjectId
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask import current_app
from bson.json_util import dumps
from azure.storage.blob import BlobServiceClient
#from azure.storage.blob import BlockBlobService


def getcollectionopportunities():
    client = MongoClient(current_app.config['MONGO_URI'], server_api=ServerApi('1'))
    db = client.candidate_management_system
    opps=db["opportunities"]
    return opps

def getAllOpenOpportunities():
    response={"data":"","message":"","status":""}
    opportunities=getcollectionopportunities()
    opps=opportunities.find({'status':'1'})
    response["data"]=dumps(opps)
    response["status"]="true"
    return response