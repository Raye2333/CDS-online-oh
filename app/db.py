from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# association_table = db.Table('association', db.Model.metadata,
#     db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
#     db.Column('request_id', db.Integer, db.ForeignKey('request.id'))
# )

class Request(db.Model):
  __tablename__ = 'request'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  course_id = db.Column(db.Integer, nullable=False)
  time_posted = db.Column(db.String, default=datetime.utcnow)
  queue_pos = db.Column(db.Integer)

  # def __init__(self, user_id=None, course_id=None, time_posted=None, queue_pos=None):
  #   self.user_id = user_id
  #   self.course_id = course_id
  #   self.time_posted = time_posted
  #   self.queue_pos = queue_pos

  def __init__(self, **kwargs):
        self.user_id = kwargs.get('user_id', '')
        self.course_id = kwargs.get('course_id','')
        self.time_posted = kwargs.get('time_posted')
        self.queue_pos = kwargs.get('queue_pos')
  

  def serialize(self):
    return {
        'user_id': self.user_id,
        'course_id' : self.course_id,
        'time_posted': self.time_posted,
        'queue_pos' : self.queue_pos,
    }

  def __repr__(self):
    return '<Request for ' + str(self.course_id) +\
    ', posted ' + str(self.time_posted) + ' at queue position ' + str(self.queue_pos) + 'by user' + str(self.user_id) + '>'


class User(db.Model):
  __tablename__ = 'user'
  id = db.Column(db.Integer, primary_key=True)
  net_id = db.Column(db.String, unique=True, nullable=False)
  ta_course_id = db.Column(db.Integer, nullable=True)
  ta_zoom_link = db.Column(db.String, nullable=True)

  def __init__(self, **kwargs):
        self.net_id = kwargs.get('net_id', '')
        self.ta_course_id = kwargs.get('ta_course_id', '')
        self.ta_zoom_link = kwargs.get('ta_zoom_link', '')
  
  def __repr__(self):
    if (self.ta_course_id is not None):
      return '<User ' + str(self.net_id) + ', TAing ' + str(self.ta_course_id) + '>'
    else:
      return '<User ' + str(self.net_id) +'>'

  def get_netid(self): 
    return {
      'net_id': self.net_id
    }
    
  # def __init__(self, net_id=None, ta_course_id=None, ta_zoom_link=None):
  #   self.net_id = net_id
  #   self.ta_course_id = ta_course_id
  #   self.ta_zoom_link = ta_zoom_link

    
        



  
