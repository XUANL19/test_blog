import pymysql
import os
from flask import Flask, Response
import json
from comment_resource import CommentResource

class BlogResource:
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
    def postBlog(title, description, owner_id, post_time):

        conn = BlogResource._get_connection()
        cur = conn.cursor()

        select_last_blog = "select blog_id from blog.blogs ORDER BY blog_id DESC LIMIT 1"
        res = cur.execute(select_last_blog)
        if res:
            last_id = cur.fetchone()["blog_id"]
            new_blog_id = str(int(last_id) + 1)
        else:
            new_blog_id = "1"

        cur.execute('INSERT INTO blog.blogs VALUES (%s, %s, %s, %s, %s)', (new_blog_id, title, description, owner_id, post_time))
        post_message = {'status': 'success', 'message': 'Successfully created!'}
        post_response = Response(json.dumps(post_message), status=200, content_type="application.json")
        return post_response


    @staticmethod
    def get_own_post(owner_id):
        sql = "SELECT * FROM blog.blogs Where blog_owner_id = %s ORDER BY blog_id DESC;"
        conn = BlogResource._get_connection()
        cur = conn.cursor()
        try:
            cur.execute(sql, owner_id)
        except:
            return None
        result = cur.fetchall()

    # get # of comments under a perticular blog, call func from commentdb
        for each in result:
            blog_id = each['blog_id']
            num = CommentResource.get_comments_number(blog_id)
            each["comment_num"] = num

        return result

    @staticmethod
    def get_blog_by_blogid(blog_id):
        sql = "SELECT * FROM blog.blogs WHERE blog_id=%s"
        conn = BlogResource._get_connection()
        cur = conn.cursor()
        try:
            cur.execute(sql, blog_id)
        except:
            return None
        
        result = cur.fetchone()
        blog_id = result['blog_id']
        num = CommentResource.get_comments_number(blog_id)
        result["comment_num"] = num
        
        return result        
