"""GraphQL Schema Module"""

from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from database.model_questions import QuestionModel
from database.model_users import UserModel
from database.base import db_session
import graphene
import utils
from datetime import datetime

import logging
logger = logging.getLogger(__name__)


# User Model Queries + Mutations
class UserAttributes:
    # user_id = graphene.String(description="Global ID of the user")
    netid = graphene.String(description="NetID of the user")
    ta_course_id = graphene.Int(description="Course ID of course that they TA")
    zoom_link = graphene.String(description="Most recent zoom link being used by user")


class User(SQLAlchemyObjectType, UserAttributes):
    """User node."""

    class Meta:
        model = UserModel
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


# Question Model Queries + Mutations
class QuestionAttributes:
    q_id = graphene.String(description="Global ID of the Question")
    user_id = graphene.ID(description="Global ID of the user")
    course_id = graphene.Int(description="Course ID of the question")
    time_posted = graphene.String(description="Time the question was submitted")
    time_started = graphene.String(description="Time the question was popped off queue")
    time_completed = graphene.String(description="Time the question was finished being answered")
    queue_pos = graphene.Int(description="Position in the queue of the question")
    zoom_link = graphene.String(description="Zoom link for the question")


class Question(SQLAlchemyObjectType, QuestionAttributes):
    """Question node."""

    class Meta:
        model = QuestionModel
        interfaces = (graphene.relay.Node,)


class CreateQuestionInput(graphene.InputObjectType, QuestionAttributes):
    """Argurments to create a question"""
    netid = graphene.String(required = True)
    course_id = graphene.Int(required = True)


class CreateQuestion(graphene.Mutation):
    """Create a Question"""
    question = graphene.Field(lambda: Question, description="Question created by this mutation")

    class Arguments:
        input = CreateQuestionInput(required=True)
    
    def mutate(self, info, input):
        data = utils.input_to_dictionary(input)
        data["time_posted"] = datetime.utcnow()
        data["queue_pos"] = len(db_session.query(QuestionModel).filter(QuestionModel.course_id == data["course_id"]).filter(QuestionModel.queue_pos > 0).all()) + 1
        
        question = QuestionModel(**data)
        db_session.add(question)
        db_session.commit()
        
        return CreateQuestion(question = question)


class UpdateQuestionInput(graphene.InputObjectType, QuestionAttributes):
    """arguments to update a question"""
    id = graphene.ID(required = True, description="Global ID of the question")


class UpdateQuestion(graphene.Mutation):
    """Update a question"""
    question = graphene.Field(lambda: Question, description="Question mutated by this mutation")

    class Arguments:
        input = UpdateQuestionInput(required=True)
    
    def mutate(self, info, input):
        """jkl"""
        data = utils.input_to_dictionary(input)
        question = db_session.query(QuestionModel).filter_by(id = data["id"])
        question.update(data)
        db_session.commit()
        question = db_session.query(QuestionModel).filter_by(id = data["id"]).first()

        return UpdateQuestion(question = question)


class RemoveQuestionInput(graphene.InputObjectType, QuestionAttributes):
    """arguments to remove a question"""
    id = graphene.ID(required = True, description="Global ID of the question")


class RemoveQuestion(graphene.Mutation):
    """Update a question"""
    question = graphene.Field(lambda: Question, description="Question mutated by this mutation")

    class Arguments:
        input = RemoveQuestionInput(required=True)
    
    def mutate(self, info, input):
        """jkl"""
        data = utils.input_to_dictionary(input)
        data["queue_pos"] = -1
        question = db_session.query(QuestionModel).filter_by(id = data["id"])
        question.update(data)
        db_session.commit()
        question = db_session.query(QuestionModel).filter_by(id = data["id"]).first()

        return RemoveQuestion(question = question)


class Query(graphene.ObjectType):
    """Query objects with GraphQL API."""

    node = graphene.relay.Node.Field()
    # Get user by unique ID
    user = graphene.relay.Node.Field(User)
    # List all users (w/ Pagination) -> Similar to /users route
    userList = SQLAlchemyConnectionField(User)
    # Get question by unique ID
    question = graphene.relay.Node.Field(Question)
    # List all questions (w/ Pagination) -> Similar to /requests route
    questionList = SQLAlchemyConnectionField(Question)
    # Get user by netid
    user_netid = graphene.Field(User, netid=graphene.String(required=True))
    # check queue pos by user id -> Similar to /check_pos/<int:user_id>
    queue_pos = graphene.Field(graphene.Int, netid=graphene.String(required=True), course_id=graphene.Int(required=True))
    # check entire course queue -> Similar to /requests/<int:course_id>
    course_queue = graphene.List(Question, course_id=graphene.Int(required=True), active=graphene.Boolean(required=False, default_value=True))


    def resolve_user_netid(self, info, netid):
        """Find users by netid"""
        query = User.get_query(info=info)
        query = query.filter(UserModel.netid == netid)
        user = query.first()
    
        return user
    

    def resolve_queue_pos(self, info, netid, course_id):
        """Find queue pos based on netid"""
        query = User.get_query(info=info)
        query = query.filter(
            QuestionModel.netid == netid
            ).filter(
                QuestionModel.queue_pos != -1
                ).filter(
                    QuestionModel.course_id == course_id
                ).with_entities(
                    QuestionModel.queue_pos
                    )

        pos = query.first()[0] if query.first() else -2

        return pos


    def resolve_course_queue(self, info, course_id, active):
        """List of all questions in  course"""
        query = Question.get_query(info=info)
        query = query.filter(QuestionModel.course_id == course_id)

        if active:
            query = query.filter(QuestionModel.queue_pos >= 0)
        
        return query.all()


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    create_question = CreateQuestion.Field()
    update_question = UpdateQuestion.Field()

