"""GraphQL Question Schema Module"""

from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from database.model_questions import QuestionModel
from database.base import db_session
import graphene
import utils


# Question Model Queries + Mutations
class QuestionAttributes:
    q_id = graphene.String(description="Global ID of the Question")
    user_id = graphene.ID(description="Global ID of the user")
    course_id = graphene.Int(description="Course ID of the question")
    time_posted = graphene.String(description="Time the question was submitted")
    time_started = graphene.String(description="Time the question was popped off queue")
    time_completed = graphene.String(description="Time the question was finished being answered")
    question_topic = graphene.String(description="Topic of user's question")
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
        data = utils.input_to_dictionary(input)
        data["queue_pos"] = -1
        question = db_session.query(QuestionModel).filter_by(id = data["id"])
        question.update(data)
        db_session.commit()
        question = db_session.query(QuestionModel).filter_by(id = data["id"]).first()

        return RemoveQuestion(question = question)
