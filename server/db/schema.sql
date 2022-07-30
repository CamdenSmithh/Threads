DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;

\c qa

DROP TABLE IF EXISTS questions, answers, photos CASCADE;

CREATE TABLE questions (
  question_id BIGSERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  question_helpfulness INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE answers (
  answer_id BIGSERIAL NOT NULL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(question_id),
  body VARCHAR(1000) NOT NULL,
  date BIGINT NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  helpfulness INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE answers_photos (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers(answer_id),
  url TEXT NOT NULL
);

CREATE INDEX questions_product_id_idx ON questions (product_id);
CREATE INDEX answers_question_id_idx ON answers (question_id);
CREATE INDEX answers_photos_photos_id ON answers_photos (answer_id);

\COPY questions FROM 'server/data/questions.csv' delimiter ',' CSV HEADER;
\COPY answers FROM 'server/data/answers.csv' delimiter ',' CSV HEADER;
\COPY answers_photos FROM 'server/data/answers_photos.csv' delimiter ',' CSV HEADER;

SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('questions', 'question_id')), (SELECT (MAX(question_id) + 1) FROM questions), FALSE);