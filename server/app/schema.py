import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from app.models import Request as RequestModel, User as UserModel
from app.db import db_session

# ref: https://docs.graphene-python.org/projects/sqlalchemy/en/latest/tutorial/

class Request(SQLAlchemyObjectType):
    class Meta:
        model = RequestModel
        interfaces = (relay.Node, )


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allows sorting over multiple columns, by default over the primary key
    all_requests = SQLAlchemyConnectionField(Request.connection)
    # Disable sorting over this field
    all_users = SQLAlchemyConnectionField(User.connection, sort=None)

schema = graphene.Schema(query=Query)