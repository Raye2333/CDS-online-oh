from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

association_table = db.Table('association', db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('request_id', db.Integer, db.ForeignKey('request.id'))
)

class Request(Base):
  __tablename__ = 'request'
  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
  course_id = Column(Integer, nullable=False)
  time_posted = Column(String, default=datetime.utcnow)
  queue_pos = Column(Integer)

  def __init__(self, user_id=None, course_id=None, time_posted=None, queue_pos=None):
    self.user_id = user_id
    self.course_id = course_id
    self.time_posted = time_posted
    self.queue_pos = queue_pos

  def __repr__(self):
    return '<Request from ' + str(self.net_id) + ' for ' + str(self.course_id) +\
    ', posted ' + str(self.time_posted) + '>'


class User(Base):
  __tablename__ = 'user'
  id = Column(Integer, primary_key=True)
  net_id = Column(String, unique=True, nullable=False)
  ta_course_id = Column(Integer, nullable=True)
  ta_zoom_link = Column(String, nullable=True)

  def __init__(self, net_id=None, ta_course_id=None, ta_zoom_link=None):
    self.net_id = net_id
    self.ta_course_id = ta_course_id
    self.ta_zoom_link = ta_zoom_link

  def __repr__(self):
    if (self.ta_course_id is not None):
      return '<User ' + str(self.net_id) + ', TAing' + str(self.ta_course_id) + '>'
    else:
      return '<User ' + str(self.net_id) +'>'
