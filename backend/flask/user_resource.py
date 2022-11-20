import pymysql
import os


class UsersResource:

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
    def get_user_by_query(query):
        conn = UsersResource._get_connection()
        cur = conn.cursor()
        sql = "SELECT * FROM users.users "

        # search with no query parameter
        if not query:
            arguments = []
        else:
            # invalid inputs
            for parameter in query:
                if parameter != "lname" and parameter != "email":
                    return None

            # search with both query parameters
            if len(query) == 2:
                sql += "WHERE last_name=%s AND email_address=%s"
                arguments = [query["lname"], query["email"]]

            # search with one query parameter
            elif "lname" in query:
                sql += "WHERE last_name=%s"
                arguments = query["lname"]

            elif "email" in query:
                sql += "WHERE email_address=%s"
                arguments = query["email"]

        try:
            cur.execute(sql, arguments)
        except:
            return None

        result = cur.fetchall()
        return result

    @staticmethod
    def get_user_by_id(id):
        sql = "SELECT * FROM users.users WHERE id=%s"
        conn = UsersResource._get_connection()
        cur = conn.cursor()

        try:
            cur.execute(sql, id)
        except:
            return None

        result = cur.fetchone()
        return result


    @staticmethod
    def get_user_by_username(username):
        sql = "SELECT * FROM users.users WHERE username=%s"
        conn = UsersResource._get_connection()
        cur = conn.cursor()

        try:
            cur.execute(sql, username)
        except:
            return None

        result = cur.fetchone()
        return result

