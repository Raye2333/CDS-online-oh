FROM python:3.7.7

ENV PIP_DEFAULT_TIMEOUT=100 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_VERSION=1.0.5

RUN pip install -U pip
RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /app

COPY poetry.lock .
COPY pyproject.toml .

RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction --no-ansi --no-dev --no-root

COPY . /app

WORKDIR app/

RUN python dummy_setup.py

EXPOSE 5000

CMD ["python", "run.py"]
