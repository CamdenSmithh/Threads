DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;

\c qa

DROP TABLE IF EXISTS questions, answers, photos;

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  question_helpfulness INTEGER NOT NULL DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions,
  body VARCHAR(1000) NOT NULL,
  date BIGINT NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers,
  url TEXT NOT NULL
);