from flask import Flask, render_template
from flask_graphql import GraphQLView
from app import logic
from app.db import db_session
# from app.schema import schema

app = Flask(__name__)

# ref: https://docs.graphene-python.org/projects/sqlalchemy/en/latest/tutorial/
# app.add_url_rule(
#     '/graphql',
#     view_func=GraphQLView.as_view(
#         'graphql',
#         schema=schema,
#         graphiql=True # for having the GraphiQL interface
#     )
# )


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

# @app.route('/')
# def home():
#   return render_template('home.html')

@app.route('/queue/<int:queue_id>')
def queue():
  pass

@app.route('/course/<int:course_id>', methods=['GET', 'POST'])
def course():
  if request.method == 'GET':
     return logic.get_queues(course_id)

if __name__ == '__main__':
  app.run(debug=True)