"""Model of Users"""

from .base import Base
from .model_questions import QuestionModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class UserModel(Base):
    """User model."""

    __tablename__ = 'user'
    
    id = Column("id", Integer, primary_key=True)
    netid = Column("netid", String, unique=True, nullable=False)
    ta_course_id = Column("ta_course_id", Integer, nullable=True)
    zoom_link = Column("zoom_link", String, nullable=True)

    questionList = relationship(QuestionModel, backref="user")