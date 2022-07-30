require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
});

module.exports = {
  queryGetQuestions: (product_id, page, count) => new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT
        questions.question_id,
        questions.question_body,
        to_timestamp(questions.question_date / 1000) question_date,
        questions.asker_name,
        questions.question_helpfulness,
        questions.reported,
        (SELECT (COALESCE(json_object_agg(
          answers.answer_id,
          json_build_object(
            'id', answers.answer_id,
            'body', answers.body,
            'date', to_timestamp(answers.date / 1000),
            'answerer_name', answerer_name,
            'photos',
            (SELECT (COALESCE(array_agg(json_build_object(
              'id', answers_photos.id,
              'url', answers_photos.url)),
              array[]::json[]))
      FROM
        answers_photos
      WHERE
        answers_photos.answer_id = answers.answer_id)))::json, '{}'))
      FROM
        answers
      WHERE
        answers.question_id = questions.question_id)
      AS
        answers
      FROM
        questions
      WHERE
        product_id = ${product_id}
        AND
        questions.reported = false
      ORDER BY
        questions.question_helpfulness
      DESC LIMIT
        ${count}
      OFFSET
        ${count * page - count}
      `,
      (err, res) => {
        if (err) return reject(err);
        return resolve(res.rows);
      },
    );
  }),

  queryGetAnswers: (question_id, page, count) => new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT
        answers.answer_id,
        answers.body,
        to_timestamp(answers.date / 1000) date,
        answers.answerer_name,
        answers.helpfulness,
          (SELECT (COALESCE(array_agg(json_build_object(
            'id', answers_photos.id,
            'url', answers_photos.url)),
            array[]::json[]))
      FROM
        answers_photos
      WHERE
        answers_photos.answer_id = answers.answer_id)
      AS
        photos
      FROM
        answers
      WHERE
        answers.question_id = ${question_id}
        AND
        answers.reported = false
      ORDER BY
        answers.helpfulness
      DESC LIMIT
        ${count}
      OFFSET
        ${count * page - count}
      `,
      (err, res) => {
        if (err) return reject(err);
        return resolve(res.rows);
      },
    );
  }),

  queryPostQuestion: (product_id, body, name, email) => new Promise((resolve, reject) => {
    pool.query(
      `
      INSERT INTO questions(
        product_id,
        question_body,
        question_date,
        asker_name,
        asker_email,
        reported,
        question_helpfulness
      )
      VALUES(
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )
      `,
      [product_id, body, Date.now(), name, email, false, 0],
      (err) => {
        if (err) return reject(err);
        return resolve();
      },
    );
  }),

  queryPostAnswer: () => {

  },

  queryPutQuestionHelpful: () => {

  },

  queryPutAnswerHelpful: () => {

  },

  queryPutAnswerReport: () => {

  },
};

// pool.query('EXPLAIN ANALYZE SELECT * FROM questions LIMIT 2')
//   .then((res) => console.log('Pool query success: ', res.rows))
//   .catch((err) => console.log('Pool query error: ', err));
