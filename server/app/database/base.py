"""SQLAlchemy Base declarations"""

import os
import configparser

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

cfg = configparser.ConfigParser()
if os.environ.get("deployment", False):
    cfg.read_file(open("./config/config.cfg"))
else:
    cfg.read_file(open("./config/config.cfg"))

cfg = cfg["DB"]

# Create database engine
db_name = cfg["HOST"]
db_path = os.path.join(os.path.dirname(__file__), db_name)
db_uri = cfg["DIALECT"] + db_name
engine = create_engine(db_uri, convert_unicode=True)

# Declarative base model to create database tables and classes
Base = declarative_base()
Base.metadata.bind = engine  # Bind engine to metadata of the base class

# Create database session object
db_session = scoped_session(sessionmaker(bind=engine, expire_on_commit=False))
Base.query = db_session.query_property()  # Used by graphql to execute queries