from flask import Flask, jsonify, request

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)
migrate = Migrate(app, db)
ma=Marshmallow(app)

class UsersModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String())
    password = db.Column(db.String())

    def __init__(self, email, password):
        self.email = email
        self.password = password
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','email','password')
user_schema = UserSchema()
@app.route('/add_user', methods=['POST'])
def add_users():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_user = UsersModel(email=data['email'], password=data['password'])
            db.session.add(new_user)
            db.session.commit()
            return {"status":1,"message": f"User {new_user.email} has been added."}
        else:
            return {"status":0, "error": "The request payload is not in JSON format"}
@app.route('/user', methods=['POST'])
def get_user():
     if request.method == 'POST':
        if request.is_json:  
            data = request.get_json()
            print('DATATTATTA', data)
            user = UsersModel.query.filter(UsersModel.email==data['email'], UsersModel.password==data['password']).one_or_none()
            if user:
                return {'status':1, 'message':'Login Success'}
            else:
                return {'status':0, 'message':'Invalid Email/Password'}  
if __name__ == '__main__':
    app.run(debug=True)