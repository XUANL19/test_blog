from db import db

class BlogModel(db.Model):
    __tablename__ = 'blogs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))

    # comments = db.relationship('CommentModel', lazy='dynamic')

    def __init__(self, title):
        self.title = title
    
    def json(self):
        return {
            'id': self.id,
            'title': self.title, 
            # 'comments': [comment.json() for comment in self.comments.all()]
        }
    
    @classmethod
    def find_by_title(cls, title):
        return cls.query.filter_by(title=title).first()  # SELECT * FROM items WHERE name=name LIMIT 1

    # update or insert
    def save_to_db(self): 
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

