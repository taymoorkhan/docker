from time import sleep
import flask
import pymongo
import mysql.connector


myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["analytics"]
mycol = mydb["analytics"]


while True:
    mysqldb = mysql.connector.connect(
    host="localhost",
    user="username",
    password="password",
    database="numbers",
    port=3306,
    socket='/var/run/mysqld/mysqld.sock'
    )
    mycursor = mysqldb.cursor()
    mycursor.execute("SELECT * FROM numbers.nums")
    myresult = mycursor.fetchall()
    numList = []
    for x in myresult:
        numList.append(x[0])
    mycol.delete_many({})
    if(len(numList)>0):
        mycol.insert_one({'avg': sum(numList)/len(numList)})
    else:
        mycol.insert_one({'avg': 0})
    sleep(2.0)