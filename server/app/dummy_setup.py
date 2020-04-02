from ast import literal_eval
from database.model_questions import QuestionModel
from database.model_users import UserModel
from database import base
import logging
import sys

# Load logging configuration
log = logging.getLogger(__name__)
logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


if __name__ == '__main__':
    log.info('Create database {}'.format(base.db_name))
    base.Base.metadata.create_all(base.engine)

    log.info('Insert Planet data in database')
    with open('database/dummy_data/questions.json', 'r') as f:
        data = literal_eval(f.read())
        for record in data:
            question = QuestionModel(**record)
            base.db_session.add(question)
        base.db_session.commit()

    log.info('Insert People data in database')
    with open('database/dummy_data/users.json', 'r') as f:
        data = literal_eval(f.read())
        for record in data:
            user = UserModel(**record)
            base.db_session.add(user)
        base.db_session.commit()