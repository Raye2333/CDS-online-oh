# import sqlite3
# import db 
# from models import Request, User
# import json 
# from flask import Flask, request
# import datetime

# @app.route('/api/get_queue/<int:course_id>', methods = ['GET'])
# def get_queue(course_id):
#   queue = Request.query.filter_by(course_id = course_id)
#   if not queue: 
#         return json.dumps({'success': False, 'error':'Queue for course not found!'}), 404
#   return json.dumps({'success': True, 'data': queue}), 200 

# @app.route('/api/get_user/<int:net_id>', methods = ['GET'])
# def get_user(net_id):
#     user = User.query.filter_by(net_id=net_id)
#     if not user: 
#         return json.dumps({'success': False, 'error':'User not found!'}), 404
#     return json.dumps({'success': True, 'data': user}), 200 


# @app.route('/api/get_user/<int:queue_id>/, methods = ['POST'])
# def add_to_queue(queue_id, user_id):
#   pass

# def remove_from_queue(queue_id, user_id):
#   pass

