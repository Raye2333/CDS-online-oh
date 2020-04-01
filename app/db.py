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
  request_topic = db.Column(db.String)

  def __init__(self, **kwargs):
        self.user_id = kwargs.get('user_id', '')
        self.course_id = kwargs.get('course_id','')
        self.time_posted = kwargs.get('time_posted')
        self.queue_pos = kwargs.get('queue_pos')
        self.request_topic = kwargs.get('request_topic')
  

  def serialize(self):
    return {
        'user_id': self.user_id,
        'course_id' : self.course_id,
        'time_posted': self.time_posted,
        'queue_pos' : self.queue_pos,
        'request_topic' : self.request_topic,
    }

  def __repr__(self):
    return '<Request about ' + self.request_topic + ' for ' + str(self.course_id) +\
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
    

    
        



  
