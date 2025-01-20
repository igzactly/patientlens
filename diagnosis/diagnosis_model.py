import pymysql
import hashlib
from flask import json

db = pymysql.connect(host="localhost",user="root",password="",database="patientlens")
db.autocommit(True)
cur = db.cursor()
def get(id):
    try:
        query="select d.id,p.patient_id,a.id,a.name,p.patient_name,d.initial_symptoms,d.diagnosis_date,d.prescribed_medicines from diagnoses d INNER JOIN patients p ON d.patient_id=p.patient_id INNER join admin a on a.id = d.admin_id where d.id ={}"
        cur.execute(query.format(id))
        return cur.fetchone()
    except Exception as error:
        print(str(error))
        return str(error)
        
def getlastdiagnosis():
    try:
        query= "select max(id) from diagnoses"
        cur.execute(query.format(id))
        output = cur.fetchone()
        return output
    except Exception as error:
        return str(error)

def getAllDiagnosis():
    try:
        query="select d.id,p.patient_id,p.patient_name,a.name,d.initial_symptoms,d.prescribed_medicines,d.diagnosis_date from diagnoses d INNER JOIN patients p ON d.patient_id=p.patient_id INNER join admin a on a.id = d.admin_id"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception as error:
        return str(error)
def add(patient_id,admin_id,report,initial_symptoms,prescribed_medicines):
    try:
        query="insert into diagnoses(patient_id,admin_id,report,initial_symptoms,prescribed_medicines) values('{}','{}','{}','{}','{}')"
        cur.execute(query.format(patient_id,admin_id,report,initial_symptoms,prescribed_medicines))
        return True
    except Exception as e:
        print(e.args)

def delete():
    return None
def permamentDelete():
    return None
def restore():
    return None
def update(id,name,phone,email,age,gender,blood_group,medical_history,emergency_number):
    try:
        query="update patients set patient_name='{}',patient_phone ='{}',patient_email='{}',patient_blood_group='{}',patient_gender='{}',patient_medical_history='{}',patient_emergency_number='{}',patient_age='{}' where patient_id={}"
        cur.execute(query.format(name,phone,email,blood_group,gender,medical_history,emergency_number,age,id))
        print(query.format(name,phone,email,blood_group,gender,medical_history,emergency_number,age,id))
        return True
    except Exception as error:
        return False
    

