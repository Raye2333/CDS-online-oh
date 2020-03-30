from flask import Flask, request
from flask_graphql import GraphQLView
import logic
from db import User, Request, db
# import schema

db_filename = "app/tmp/test.db"
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

@app.route('/course/<int:course_id>', methods=['GET', 'POST'])
def course():
  if request.method == 'GET':
     return logic.get_queues(course_id)

if __name__ == '__main__':
  app.run(debug=True)