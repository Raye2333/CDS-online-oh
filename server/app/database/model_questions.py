from .base import Base
# from .model_users import UserModel
from sqlalchemy import Column, Integer, String, ForeignKey
# from sqlalchemy.orm import relationship

class QuestionModel(Base):
    """Question Model."""

    __tablename__ = "questions"

    id = Column("id", Integer, primary_key=True)
    netid = Column("user_id", String, ForeignKey('user.netid'), nullable=False)
    course_id = Column("course_id", Integer, nullable=False)
    time_posted = Column("time_posted", String)
    time_started = Column("time_started", String)
    time_completed = Column("time_completed", String)
    queue_pos = Column("queue_pos", Integer)
    zoom_link = Column("zoom_link", String)
