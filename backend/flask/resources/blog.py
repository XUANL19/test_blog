from flask_restful import Resource
from models.blog import BlogModel


class Blog(Resource):

    def get(self, title):
        blog = BlogModel.find_by_title(title)
        if blog:
            return blog.json()
        return {'message': 'Blog not found'}, 404
        
    def post(self, title):
        if BlogModel.find_by_title(title):
            return {'message': "A blog with name '{}' already exists.".format(title)}, 400

        store = BlogModel(title)

        try:
            store.save_to_db()
        except:
            return {'message': 'An error occurred inserting the item.'}, 500  # Internal server error

        return store.json(), 201 

    def delete(self, title):
        blog = BlogModel.find_by_title(title)
        if blog:
            blog.delete_from_db()

        return {'message': 'Blog deleted'}


class BlogList(Resource):
    def get(self):
        return {'blogs': [blog.json() for blog in BlogModel.query.all()]}
        