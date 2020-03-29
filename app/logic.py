import sqlite3

def get_queue(course_id):
  # help
  pass

def add_to_queue(queue_id, user_id):
  pass

def remove_from_queue(queue_id, user_id):
  pass

def get_user(net_id):
    user = User.query.filter_by(net_id=net_id)
    return user