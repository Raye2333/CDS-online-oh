from flask import Flask, request
# from flask_graphql import GraphQLView
from db import User, Request, db
import json
from datetime import datetime
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

@app.route('/register', methods = ['POST'])
def register_user():
  post_body = json.loads(request.data)
  net_id = post_body.get('net_id', '')
  ta_course_id = post_body.get('ta_course_id', 0)
  ta_zoom_link = post_body.get('ta_zoom_link', '')

  user = User(
    net_id = net_id,
    ta_course_id = ta_course_id, 
    ta_zoom_link = ta_zoom_link
    )

  db.session.add(user)
  db.session.commit()
  return json.dumps({'success': True, 'data' : user.__repr__()}), 201

@app.route('/users', methods = ['GET'])
def get_all_users():
  users = User.query.all()
  res = {'success': True, 'data': [u.__repr__() for u in users]}
  return json.dumps(res), 200

@app.route('/requests', methods = ['GET'])
def get_all_requests():
  requests = Request.query.all()
  res = {'success': True, 'data': [u.__repr__() for u in requests]}
  return json.dumps(res), 200

@app.route('/queue/<int:user_id>', methods = ['POST'])
def create_queue_request(user_id):
  post_body = json.loads(request.data)
  user_id = user_id
  course_id = post_body.get('course_id')
  time_posted = datetime.now()
  user = User.query.filter_by(id = user_id).first()
  user_ser = user.get_netid()

  #checks to see if this user is already in a queue
  user_requests = Request.query.filter_by(user_id = user_id).first()

  #if the user is already in a queue it does not allow them to make another request
  if not user_requests is None: 
    return  json.dumps({'success': False, 'user': "user alr made request"}), 201
  
  #tracking existing requests under the course_id in order to find current queue length
  existing_requests = Request.query.filter_by(course_id = course_id)

  if not existing_requests:
    queue_pos = 1
  else: 
    length = 0
    for u in existing_requests:
      length += 1
    queue_pos = length + 1
    
  queue_request = Request(
      user_id = user_id,
      course_id = course_id,
      time_posted = time_posted,
      queue_pos = queue_pos
    )

  db.session.add(queue_request)
  db.session.commit()
  return json.dumps({'success': True, 'user': user_ser, 'data' : queue_request.__repr__()}), 201

@app.route('/dequeue/<int:user_id>', methods = ['POST'])
def remove_from_queue(user_id):
  post_body = json.loads(request.data)
  user_id = user_id
  course_id = post_body.get('course_id')

  user_request = Request.query.filter_by(user_id=user_id).filter_by(course_id=course_id).first()
  if not user_request: 
    return json.dumps({'success': False, 'data': "request for queue does not exist"}), 200
  db.session.delete(user_request)
  db.session.commit()

  remaining_requests = Request.query.filter_by(course_id=course_id)
  for r in remaining_requests:
    r.queue_pos -= 1
  db.session.commit()

  # unsure what to return
  res = {'success': True, 'data': [u.__repr__() for u in remaining_requests]}
  return json.dumps(res), 200

@app.route('/check_pos/<int:user_id>', methods = ['POST'])
def check_queue_pos(user_id):
  post_body = json.loads(request.data)
  user_id = user_id
  course_id = post_body.get('course_id')

  user_request = Request.query.filter_by(user_id=user_id).filter_by(course_id=course_id).first()
  pos = user_request.queue_pos

  res = {'success': True, 'data': str(pos)}
  return json.dumps


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)