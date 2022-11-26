import pymysql
from flask import Flask, Response, request
import json
from flask_mysqldb import MySQL
import os


class DatabaseOperations:

    def __int__(self):
        pass

    @staticmethod
    def _get_connection():

        usr = "root"
        pw = "84443295412lx."
        h = "localhost"

        conn = pymysql.connect(
            user=usr,
            password=pw,
            host=h,
            cursorclass=pymysql.cursors.DictCursor,
            autocommit=True
        )
        return conn

    @staticmethod
    def get_by_key(username, password):

        sql = "SELECT * FROM users.users where username = %s AND password = %s"
        conn = DatabaseOperations._get_connection()
        cur = conn.cursor()
        res = cur.execute(sql, args=(username, password,))
        result = cur.fetchone()
        if result:
            found_user_message = {'status': 'success', 'message': 'Successfully found user'}
            found_response = Response(json.dumps(found_user_message), status=200, content_type="application.json")
            return found_response
        else:
            failure_message = {'status': 'fail', 'message': 'Failed finding user'}
            fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
            return fail_response

    @staticmethod
    def user_register(username, password, first_name, last_name, email_address):

        sql = "SELECT * FROM users.users where username = %s OR email_address = %s"
        conn = DatabaseOperations._get_connection()
        cur = conn.cursor()
        res = cur.execute(sql, args=(username,email_address,))
        result = cur.fetchone()

        if result:
            failure_message = {'status': 'fail_exist', 'message': 'Username or email address already exist!'}
            fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
            return fail_response

        else:
            res = cur.execute('INSERT INTO users.users VALUES (%s, %s, %s, %s, %s)', (last_name, first_name, email_address, username, password,))
            create_user_message = {'status': 'success', 'message': 'Successfully created!'}
            create_response = Response(json.dumps(create_user_message), status=200, content_type="application.json")
            return create_response




