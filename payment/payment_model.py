import pymysql
import hashlib
from flask import json

db = pymysql.connect(host="localhost",user="root",password="",database="patientlens")
db.autocommit(True)
cur = db.cursor()

def add(diagnosis_id,payment_amount,mode_of_payment):
    try:
        query =""
        if int(mode_of_payment)==1:
            query="insert into payments(diagnosis_id,amount,mode_of_payment,status) values ('{}','{}','{}',0)";
        elif int(mode_of_payment) ==2:
             query="insert into payments(diagnosis_id,amount,mode_of_payment,status) values ('{}','{}','{}',1)";
        else:
            return False
        
        return cur.execute(query.format(diagnosis_id,payment_amount,mode_of_payment))
    except Exception as error:
        print(str(error))
        return False


def getAll():
    try:
        query = "select p.id,d.id,pt.patient_name,a.name,d.report,d.diagnosis_date,p.status from payments p INNER JOIN diagnoses d on p.diagnosis_id = d.id LEFT JOIN patients pt on d.patient_id = pt.patient_id LEFT JOIN admin a on d.admin_id = a.id"
        cur.execute(query)
        return cur.fetchall()
    except Exception as error:
        print(str(error))
        return False

def update(id,status):
    try:
        query="update payments set status = {} where id ={}"
        print(query.format(id))
        return cur.execute(query.format(status,id))
    except Exception as error:
        print(str(error))
        return False

def get(id):
    try:
        query = "select status from payments where id = {}"
        cur.execute(query.format(id))
        return cur.fetchone()
    except Exception as error:
        print(str(error))
        return False