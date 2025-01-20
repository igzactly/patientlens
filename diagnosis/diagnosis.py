from flask import Blueprint,render_template,request,jsonify,send_from_directory
import json
import os
import diagnosis.diagnosis_model as diagnosis_model
diagnosis=Blueprint("diagnosis",__name__,url_prefix="/diagnosis")

BASE_DIR = os.path.abspath("uploads")
#page Loaders
@diagnosis.route("/")
@diagnosis.route("/alldiagnoses")
def alldiagnosiss():
    return render_template("alldiagnosis.html",getEnabled=True)
#operations

@diagnosis.route("/adddiagnosis",methods=["POST"])
def adddiagnosis():
    userData=request.json
    response={"data":diagnosis_model.add(userData["patient_id"],userData["admin_id"],userData["report"],userData["initial_symptoms"],userData["prescribed_medicines"]),"last_diagnosis":getlastdiagnosis(),"message":"diagnosis Added successfully !"}
    return json.dumps(response)





@diagnosis.route("/updateDiagnosis",methods=["POST"])
def updatediagnosis():
    userData=request.json
    #id,name,phone,email,age,gender,blood_group,medical_history,emergency_number
    response={"data":diagnosis_model.update(userData["id"],userData["name"],userData["phone"],userData["email"],userData["gender"],userData["age"],userData["bloodGroup"],userData["medicalHistory"],userData["emergencyNumber"]),"message":"diagnosis Updated successfully !"}
    print(userData)
    return json.dumps(response)

@diagnosis.route("/getalldiagnosis",methods=['GET'])
def getAllDiagnosis():
    try:
        response=diagnosis_model.getAllDiagnosis()
        return json.dumps(response)
    except Exception as error:
        response = {"message":error}
        print(response)
        return json.dumps(response, default=str) 


def getlastdiagnosis():
    try:
        response=diagnosis_model.getlastdiagnosis()
        return json.dumps(response)
    except Exception as error:
        response = {"message":error}
        return json.dumps(response, default=str) 

# @diagnosis.route('/getimages/<int:patient_id>/<int:diagnosis_id>/<string:filename>', methods=['GET'])
# def get_images(patient_id, diagnosis_id):
#     folder_path = os.path.join(BASE_DIR, str(patient_id), str(diagnosis_id))
#     if not os.path.exists(folder_path):
#         return send_from_directory(folder_path, filename)

@diagnosis.route('/loadimage/<int:patient_id>/<int:diagnosis_id>/<path:filename>', methods=['GET','POST'])
def serve_image( patient_id, diagnosis_id, filename):
    """Serve an individual image."""
    # Check if the folder and file exist
    folder_path = os.path.join(BASE_DIR, str(patient_id), str(diagnosis_id))
    print(folder_path)
    if not os.path.exists(folder_path):
        print(f"Folder does not exist: {folder_path}")
        abort(404, description="Folder not found")

    file_path = os.path.join(folder_path, filename)
    if not os.path.isfile(file_path):
        print(f"File does not exist: {file_path}")
        abort(404, description="File not found")

    # Serve the file
    return send_from_directory(folder_path, filename)
   
@diagnosis.route("/getDiagnosisDetails",methods=['POST'])
def getdiagnosisDetails():
    try:
        data=request.json
        responseData=diagnosis_model.get(data["id"])
        #getting the list of images 2  patient_id  
        folder_path = os.path.join(BASE_DIR, str(responseData[2]), str(data["id"]))
        if not os.path.exists(folder_path):
            responseData.append(jsonify({'error': 'No images found'}), 404)
        images = os.listdir(folder_path)
        image_urls = [f'http://127.0.0.1:5000/diagnosis/loadimage/{responseData[1]}/{responseData[2]}/{img}' for img in images]
        #responseData.append(jsonify({'images': image_urls}))
        response={"data":responseData,"imagelist":image_urls}
        return json.dumps(response)
    except Exception as e:
        print(str(e))
        return False


@diagnosis.route("/disablediagnosis",methods=['POST'])
def disablediagnosis():
    return "Disable diagnosis"

@diagnosis.route("/enablediagnosis",methods=['POST'])
def enablediagnosis():
    return "Enable diagnosis"

@diagnosis.route("/permanentlyDeletediagnosis",methods=['POST'])
def permanentlyDeletediagnosis():
    return "Delete  diagnosis"


@diagnosis.route('/uploadimages', methods=['POST'])
def upload_images():
    patient_id = request.form['patient_id']
    diagnosis_id = request.form['diagnosis_id']

    if 'images' not in request.files:
        return jsonify({"error": "No image files provided"}), 400

    image_files = request.files.getlist('images')
    folder_path = os.path.join(BASE_DIR, patient_id, diagnosis_id)
    os.makedirs(folder_path, exist_ok=True)

    saved_files = []

    for image_file in image_files:
        file_path = os.path.join(folder_path, image_file.filename)
        image_file.save(file_path)
        saved_files.append(file_path)

    return jsonify({
        "message": f"{len(saved_files)} images uploaded successfully",
        "saved_files": saved_files
    }), 200




