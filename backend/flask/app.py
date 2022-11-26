from flask import Flask, jsonify, Response, request, render_template, redirect, url_for, session
from flask_restful import Api
from db import db
import json
from flask_cors import CORS
from datetime import datetime

from blog_resource import BlogResource
from database_operation import DatabaseOperations
from user_resource import UsersResource
from resources.blog import Blog, BlogList
from resources.comment import Comment, CommentList, Delete
from flask_cors import CORS
from comment_resource import CommentResource


app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:84443295412lx.@localhost/commentdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'yanbing'  # app.config['JWT_SECRET_KEY']
api = Api(app)

@app.before_first_request
def create_tables():
    db.create_all()     

api.add_resource(Blog, '/blog/<string:title>')
api.add_resource(BlogList, '/blogs')
api.add_resource(Comment, '/<string:user_id>/posts/<string:blog_id>/addcomment')
api.add_resource(Delete, '/<string:user_id>/posts/<string:blog_id>/deletecomment')
api.add_resource(CommentList, '/comments')



# search users by query string parameters (none/last name/email/both)
# return an array of users matching query
@app.route("/users", methods=['GET'])
def users():
    args = request.args.to_dict()
    result = UsersResource.get_user_by_query(args)

    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")
    return response


@app.route("/<string:username>", methods=["GET"])
def get_user_by_username(username):
    result = UsersResource.get_user_by_username(username)

    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")
    return response


# search a user by id
# return a single user with matching id
@app.route("/users/<id>", methods=["GET"])
def get_user_by_id(id):
    result = UsersResource.get_user_by_id(id)

    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")
    return response


# login service
@app.route("/login", methods=["POST"])
def check_user_login():

    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        user_login_info = request.json
        username = user_login_info['username']
        password = user_login_info['password']
        result = DatabaseOperations.get_by_key(username, password)
        return result


# logout service
@app.route('/logout')
def logout():
    return redirect(url_for('login'))


# register service
@app.route('/register', methods=["POST"])
def user_registration():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        user_register_info = request.json
        username = user_register_info['username']
        password = user_register_info['password']
        first_name = user_register_info['firstName']
        last_name = user_register_info['lastName']
        email_address = user_register_info['email']
        result = DatabaseOperations.user_register(username, password, first_name, last_name, email_address)
        #result = DatabaseOperations.get_by_key(username, password)
        return result

# post a blog
@app.route("/<string:user_id>/addpost", methods=["POST"])
def post_blog(user_id):
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        blog_info = request.json
        title = blog_info["title"]
        description = blog_info["description"]
        post_time = datetime.now().isoformat(sep=" ", timespec="seconds")
        return BlogResource.postBlog(title, description, user_id, post_time)


# get posts
@app.route("/<owner_id>/posts", methods=["GET"])
def get_blogs(owner_id):
    result = BlogResource.get_own_post(owner_id)
    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")
    return response


@app.route("/<string:user_id>/posts/<blog_id>", methods=["GET"])
def get_blog_by_id(user_id, blog_id):
    result = BlogResource.get_blog_by_blogid(blog_id)
    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")
    return response


@app.route("/<string:user_id>/posts/<blog_id>/getcomments", methods=["GET"])
def get_comments_by_blogid(user_id, blog_id):
    result = CommentResource.get_comments_by_blogID(blog_id)
    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")

    return response


@app.route("/<string:user_id>/posts/<blog_id>/getcommentsnum", methods=["GET"])
def get_commentsnum_by_blogid(user_id, blog_id):
    comment_num = str(CommentResource.get_comments_number(blog_id))
    return Response(comment_num, status=200, content_type="application/json")


@app.route("/<user_id>/posts/<blog_id>/like", methods=["GET"])
def get_like_state(user_id, blog_id):
    result = BlogResource.like_and_dislike_state_check(user_id, blog_id)
    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")

    return response


@app.route("/<user_id>/posts/<blog_id>/addlike", methods=["GET"])
def add_like(user_id, blog_id):
    response = BlogResource.add_to_like(user_id, blog_id)
    return response


@app.route("/<user_id>/posts/<blog_id>/adddislike", methods=["GET"])
def add_dislike(user_id, blog_id):
    response = BlogResource.add_to_dislike(user_id, blog_id)
    return response


@app.route("/<user_id>/posts/<blog_id>/removelike", methods=["GET"])
def remove_like(user_id, blog_id):
    response = BlogResource.remove_from_like(user_id, blog_id)
    return response 


@app.route("/<user_id>/posts/<blog_id>/removedislike", methods=["GET"])
def remove_dislike(user_id, blog_id):
    response = BlogResource.remove_from_dislike(user_id, blog_id)
    return response 


# make it only run when we run python app.py, not for other files import app.py
# only the file you run is '__main__'
if __name__ == '__main__':
    db.init_app(app)
    # app.run(port=5011, debug=True)
    app.run(host="0.0.0.0", port=5011)
    
