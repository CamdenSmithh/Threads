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
        to_timestamp(questions.question_date / 1000),
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
        answers.
      FROM
        answers
      WHERE
        question_id = ${question_id}
        AND
        answers.reported = false
      `,
      (err, res) => {
        if (err) return reject(err);
        return resolve(res.rows);
      },
    );
  }),

  queryPostQuestion: () => {

  },

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
