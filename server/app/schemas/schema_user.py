"""GraphQL User Schema Module"""

from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from database.model_users import UserModel, CourseModel
from database.base import db_session
import graphene
import utils


# User Model Queries + Mutations
class UserAttributes:
    # user_id = graphene.String(description="Global ID of the user")
    netid = graphene.String(description="NetID of the user")
    ta_course_id = graphene.Int(description="Course ID of course that they TA")
    zoom_link = graphene.String(description="Most recent zoom link being used by user")
    courses = graphene.List(description="Course IDs of the user's courses")


class User(SQLAlchemyObjectType, UserAttributes):
    """User node."""

    class Meta:
        model = UserModel
        interfaces = (graphene.relay.Node,)


class CourseAttributes:
    course_id = graphene.Int(description="CourseID of the course")
    course_name = graphene.String(description="Course Name (i.e. 'CS 3110')")
    students = graphene.List(description="NetIDs of enrolled students")
    teaching_assistants = graphene.List(description="NetIDs of course's TAs")


class Course(SQLAlchemyObjectType, CourseAttributes):
    """Course node."""

    class Meta:
        model = CourseModel
        interfaces = (graphene.relay.Node,)


class CreateUserInput(graphene.InputObjectType, UserAttributes):
    """Arguments to create a planet."""
    pass


class CreateUser(graphene.Mutation):
    """df"""
    user = graphene.Field(lambda : User, description="User created by this mutation")

    class Arguments:
        input = CreateUserInput(required=True)
    
    def mutate(self, info, input):
        """hjk"""
        data = utils.input_to_dictionary(input)
        user = UserModel(**data)
        db_session.add(user)
        db_session.commit()

        return CreateUser(user = user)


class UpdateUserInput(graphene.InputObjectType, UserAttributes):
    """arguments to update the user's zoom"""
    netid = graphene.String(required = True, description="NetID of the student")


class UpdateUser(graphene.Mutation):
    """Update a User's Zoom"""
    user = graphene.Field(lambda : User, description="User created by this mutation")

    class Arguments:
        input = UpdateUserInput(required=True)
    
    def mutate(self, info, input):
        data = utils.input_to_dictionary(input)
        user = db_session.query(UserModel).filter_by(netid=data["netid"])
        user.update(data)
        db_session.commit()
        user = db_session.query(UserModel).filter_by(netid=data["netid"]).first()

        return UpdateUser(user = user)
