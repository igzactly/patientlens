from flask import Blueprint,render_template,request
import json
import patient.patient_model as patient_model
patient=Blueprint("patients",__name__,url_prefix="/patients")

#page Loaders
@patient.route("/")
@patient.route("/allPatients")
def allpatients():
    return render_template("allpatients.html")

@patient.route("/appconfig")
def appconfig():
    return render_template("appconfig.html")

@patient.route("/privilegegroups")
def privilegegroups():
    return render_template("privilegegroups.html")


#operations

@patient.route("/addpatient",methods=["POST"])
def addPatient():
    userData=request.json
    response={"data":patient_model.add(userData["name"],userData["email"],userData["phone"],userData["gender"],userData["bloodGroup"],userData["medicalHistory"],userData["emergencyNumber"],userData["age"]),"message":"patient Added successfully !"}
    return json.dumps(response)





@patient.route("/updatePatient",methods=["POST"])
def updatePatient():
    userData=request.json
    #id,name,phone,email,age,gender,blood_group,medical_history,emergency_number
    response={"data":patient_model.update(userData["id"],userData["name"],userData["phone"],userData["email"],userData["gender"],userData["age"],userData["bloodGroup"],userData["medicalHistory"],userData["emergencyNumber"]),"message":"patient Updated successfully !"}
    print(userData)
    return json.dumps(response)

@patient.route("/getAllpatients",methods=['GET'])
def getAllpatients():
    try:
        response=patient_model.getAllPatients()
        return json.dumps(response)
    except Exception as error:
        response = {"message":error}
        return json.dumps(response) 
        

@patient.route("/getpatientDetails",methods=['POST'])
def getpatientDetails():
    try:
        data=request.json
        response={"data":patient_model.get(data["id"]),"message":"patient Data Fetched Successfully !"}
        return json.dumps(response)
    except Exception as e:
        print(str(e))
        return False

@patient.route("/disablepatient",methods=['POST'])
def disablepatient():
    return "Disable patient"

@patient.route("/enablepatient",methods=['POST'])
def enablepatient():
    return "Enable patient"

@patient.route("/permanentlyDeletepatient",methods=['POST'])
def permanentlyDeletepatient():
    return "Delete  patient"

