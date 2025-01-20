from flask import Blueprint,render_template,request,jsonify,send_from_directory
import json
import os
import payment.payment_model as payment_model
payment=Blueprint("payment",__name__,url_prefix="/payment")

#page Loaders
@payment.route("/")
@payment.route("/allpayments")
def alldiagnosiss():
    return render_template("allpayments.html",getEnabled=False)
#operations



@payment.route("/getallpayments",methods=['GET'])
def getAllPayments():
    try:
        response=payment_model.getAll()
        return json.dumps(response)
    except Exception as error:
        response = {"message":error}
        print(response)
        return json.dumps(response, default=str) 

@payment.route("/addpayment",methods=['POST'])
def addpayment():
    try:
        userData=request.json
        print(userData)
        response={"data":payment_model.add(userData["diagnosis_id"],userData["payment_amount"],userData["modeofpayment"]),"message":"payment Added successfully !"}
    except Exception as error:
        print(str(error))
        response={"data":"false","message":str(error)}
    finally:    
        return json.dumps(response)

@payment.route("/updatePayment",methods=['POST'])
def updatepayment():
    try:
        userData=request.json
        print(userData)
        response={"data":payment_model.update(userData["id"],userData["paymentStatus"]),"message":"payment Updated successfully !"}
    except Exception as error:
        print(str(error))
        response={"data":"false","message":str(error)}
    finally:    
        return json.dumps(response)


@payment.route("/getPaymentDetails",methods=['POST'])
def getPaymentDetails():
    try:
        userData=request.json
        response=payment_model.get(userData["payment_id"])
        return json.dumps(response)
    except Exception as error:
        response = {"message":error}
        print(response)
        return json.dumps(response, default=str) 