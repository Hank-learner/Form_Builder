#!/usr/bin/python3
import pymysql

sqlhost = "localhost"
sqluser = "root"
sqlpassword = "tonyjones"

conn = pymysql.connect(sqlhost, sqluser, sqlpassword)
cursor = conn.cursor()

sqlstmt = "CREATE DATABASE formbuilder;"
cursor.execute(sqlstmt)

sqlstmt = "USE formbuilder;"
cursor.execute(sqlstmt)

sqlstmt = "CREATE TABLE userdetails(username varchar(255) not null, email varchar(255) not null,password varchar(255) not null);"
cursor.execute(sqlstmt)

sqlstmt = "CREATE USER 'userformbuilder'@'localhost' IDENTIFIED BY 'userformbuilder1!Q';"
cursor.execute(sqlstmt)

sqlstmt = "GRANT ALL PRIVILEGES ON formbuilder . * TO 'userformbuilder'@'localhost';"
cursor.execute(sqlstmt)

sqlstmt = "FLUSH PRIVILEGES;"
cursor.execute(sqlstmt)

conn.close()
