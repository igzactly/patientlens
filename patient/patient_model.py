import pymysql
import hashlib
from flask import json

db = pymysql.connect(host="localhost",user="root",password="",database="patientlens")
db.autocommit(True)
cur = db.cursor()
def get(id):
    query="select p.patient_id, p.patient_name,p.patient_email,p.patient_phone, p.patient_age,p.patient_gender,p.patient_blood_group,p.patient_medical_history,p.patient_emergency_number from patients p where p.patient_id = {}"
    cur.execute(query.format(id))
    return cur.fetchone()
        


def getAllPatients():
    try:
        query="select p.patient_id, p.patient_name,p.patient_phone,p.patient_blood_group from patients p"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception as error:
        return str(error)
def add(name,phone,email,privilege_id):
    try:
        defaultPass="abcd1234"
        query="insert into patient(name,phone,email,password,privilege_id) values('{}','{}','{}',(SELECT MD5('{}')),'{}')"
        cur.execute(query.format(name,phone,email,defaultPass,privilege_id))
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
    

