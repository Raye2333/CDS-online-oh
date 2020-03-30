from flask import Flask, request
# from flask_graphql import GraphQLView
import logic
from db import User, Request, db
import json

# import schema

db_filename = "oh.db"
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///%s' % db_filename
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db.init_app(app)
with app.app_context():
    db.create_all()

# ref: https://docs.graphene-python.org/projects/sqlalchemy/en/latest/tutorial/
# app.add_url_rule(
#     '/graphql',
#     view_func=GraphQLView.as_view(
#         'graphql',
#         schema=schema,
#         graphiql=True # for having the GraphiQL interface
#     )
# )

@app.route('/queue/<int:queue_id>')
def queue():
  pass

@app.route('/dequeue/<int:queue_id>')
def dequeue():
  pass

@app.route('/register', methods = ['POST'])
def register_user():
  post_body = json.loads(request.data)
  net_id = post_body.get('net_id', '')
  ta_course_id = post_body.get('ta_course_id', 0)
  ta_zoom_link = post_body.get('ta_zoom_link', '')

  user = User(
    net_id = net_id,
    ta_course_id = ta_course_id, 
    ta_zoom_link = ta_zoom_link, 
    )

  db.session.add(user)
  db.session.commit()
  return json.dumps({'success': True, 'data' : user.__repr__()}), 201

# @app.route('/course/<int:course_id>', methods=['GET', 'POST'])
# def course():
#   if request.method == 'GET':
#      return logic.get_queues(course_id)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)