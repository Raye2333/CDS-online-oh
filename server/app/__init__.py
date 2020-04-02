from database.base import db_session
from flask import Flask
from flask_graphql import GraphQLView
from graphene import Schema
from schema import Query, Mutation

view_func = GraphQLView.as_view(
    "graphql", schema=Schema(query=Query, mutation=Mutation), graphiql=True
)

app = Flask(__name__)
app.add_url_rule("/", view_func=view_func)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)