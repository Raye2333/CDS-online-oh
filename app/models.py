from sqlalchemy import Table, Column, Integer, String
from sqlalchemy.orm import mapper
from yourapplication.database import metadata, db_session

class Request(object):
    query = db_session.query_property()

    def __init__(self, net_id=None, course_id=None, time_posted=None, queue_pos=None):
        self.net_id = net_id
        self.course_id = course_id
        self.time_posted = time_posted
        self.queue_pos = queue_pos

    def __repr__(self):
        return '<Request from ' + self.net_id + ' for ' + self.course_id +\
        ', posted ' + self.time_posted + '>'


class User(object):
    query = db_session.query_property()

    def __init__(self, net_id=None, ta_course_id=None):
        self.net_id = net_id
        self.ta_course_id = ta_course_id
        self.ta_zoom_link = ta_zoom_link

    def __repr__(self):
        return '<User ' + self.net_id + ', TAing' + self.ta_course_id + '>'


requests = Table('requests', metadata,
    Column('id', Integer, primary_key=True),
    Column('net_id', String, unique=True),
    Column('course_id', String),
    Column('time_posted', String),
    Column('queue_pos', Int)
)

users = Table('requests', metadata,
    Column('id', Integer, primary_key=True),
    Column('net_id', String, unique=True),
    Column('ta_course_id', String),
    Column('ta_zoom_link', String)
)

mapper(Request, requests)
mapper(User, users)