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

        cur.execute('INSERT INTO blog.blogs VALUES (%s, %s, %s, %s, %s, "[]", 0, "[]", 0)', (new_blog_id, title, description, owner_id, post_time))
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

    @staticmethod
    def get_like_state(user_id, blog_id):
        conn = BlogResource._get_connection()
        cur = conn.cursor()
        sql = "SELECT JSON_SEARCH((select liked_by from blog.blogs where blog_id = %s), 'one', %s)"

        cur.execute(sql, (blog_id, user_id))
        result = list(cur.fetchone().values())[0]
        if result:
            return 1
        else:
            return 0

    @staticmethod
    def get_dislike_state(user_id, blog_id):
        conn = BlogResource._get_connection()
        cur = conn.cursor()
        sql = "SELECT JSON_SEARCH((select disliked_by from blog.blogs where blog_id = %s), 'one', %s)"

        cur.execute(sql, (blog_id, user_id))
        result = list(cur.fetchone().values())[0]
        if result:
            return 1
        else:
            return 0


    @staticmethod
    def get_like_and_dislike_num(user_id, blog_id):
        conn = BlogResource._get_connection()
        cur = conn.cursor()
        sql = "select likecount, dislikecount from blog.blogs where blog_id = %s"
        cur.execute(sql, blog_id)
        res = cur.fetchone()
        return res


    @staticmethod
    def like_and_dislike_state_check(user_id, blog_id):

        res = BlogResource.get_like_and_dislike_num(user_id, blog_id)
        like = BlogResource.get_like_state(user_id, blog_id)
        dislike = BlogResource.get_dislike_state(user_id, blog_id)

        if like:
            res['likestate'] = '1'
        elif dislike:
            res['likestate'] = '2'
        else:
            res['likestate'] = '0'
        return res

    @staticmethod
    def add_to_like(user_id, blog_id):
        conn = BlogResource._get_connection()
        cur = conn.cursor()

        sql = "select json_array_append((select liked_by from blog.blogs where blog_id = %s),'$', %s)"  
        res = cur.execute(sql, (str(blog_id), str(user_id)))
        added_res = list(cur.fetchone().values())[0]

        update_sql = "update blog.blogs set liked_by = %s where blog_id=%s"
        res = cur.execute(update_sql,(added_res, blog_id))

        plus_sql = "update blog.blogs set likecount = likecount + 1 where blog_id=%s"
        cur.execute(plus_sql, blog_id)

        if res:
            message = {'status': 'success', 'message': 'like Successfully added!'}
            response = Response(json.dumps(message), status=200, content_type="application.json")
            return response   
        else:
            message = {'status': 'failed', 'message': 'like failed added!'}
            response = Response(json.dumps(message), status=200, content_type="application.json")
            return response 

    @staticmethod
    def add_to_dislike(user_id, blog_id):
        conn = BlogResource._get_connection()
        cur = conn.cursor()
        sql = "select json_array_append((select disliked_by from blog.blogs where blog_id=%s),'$', %s)"  
        cur.execute(sql, (blog_id, user_id))
        added_res = list(cur.fetchone().values())[0]

        update_sql = "update blog.blogs set disliked_by = %s where blog_id=%s"
        res = cur.execute(update_sql,(added_res, blog_id))

        plus_sql = "update blog.blogs set dislikecount = dislikecount + 1 where blog_id=%s"
        cur.execute(plus_sql, blog_id)

        if res:
            message = {'status': 'success', 'message': 'dislike Successfully added!'}
            response = Response(json.dumps(message), status=200, content_type="application.json")
            return response 
        else:
            message = {'status': 'failed', 'message': 'dislike failed added!'}
            response = Response(json.dumps(message), status=200, content_type="application.json")
            return response 


    @staticmethod
    def remove_from_like(user_id, blog_id):
        conn = BlogResource._get_connection()
        cur = conn.cursor()
        sql = "select json_remove((select liked_by from blog.blogs where blog_id = %s), JSON_UNQUOTE((SELECT JSON_SEARCH((select liked_by from blog.blogs where blog_id = %s), 'one', %s))))"
        cur.execute(sql, (blog_id, blog_id, user_id))
        removed_res = list(cur.fetchone().values())[0]

        update_sql = "update blog.blogs set liked_by = %s where blog_id=%s"
        res = cur.execute(update_sql,(removed_res, blog_id))

        minus_sql = "update blog.blogs set likecount = likecount - 1 where blog_id=%s"
        cur.execute(minus_sql, blog_id)

        if res:
            message = {'status': 'success', 'message': 'like Successfully removed!'}
            response = Response(json.dumps(message), status=200, content_type="application.json")
            return response 
        else:
            message = {'status': 'failed', 'message': 'like failed removed!'}
            response = Response(json.dumps(message), status=200, content_type="application.json")
            return response 

    @staticmethod
    def remove_from_dislike(user_id, blog_id):
        conn = BlogResource._get_connection()
        cur = conn.cursor()
        sql = "select json_remove((select disliked_by from blog.blogs where blog_id = %s), JSON_UNQUOTE((SELECT JSON_SEARCH((select disliked_by from blog.blogs where blog_id = %s), 'one', %s))))"
        cur.execute(sql, (blog_id, blog_id, user_id))
        removed_res = list(cur.fetchone().values())[0]

        update_sql = "update blog.blogs set disliked_by = %s where blog_id=%s"
        res = cur.execute(update_sql,(removed_res, blog_id))

        minus_sql = "update blog.blogs set dislikecount = dislikecount - 1 where blog_id=%s"
        cur.execute(minus_sql, blog_id)

        if res:
            message = {'status': 'success', 'message': 'dislike Successfully removed!'}
            response = Response(json.dumps(message), status=200, content_type="application.json")
            return response 
        else:
            message = {'status': 'failed', 'message': 'dislike failed removed!'}
            response = Response(json.dumps(message), status=200, content_type="application.json")
            return response 