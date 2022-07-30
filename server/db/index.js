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
  queryGetQuestions: (product_id, page = 1, count = 5) => new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT
        questions.question_id,
        questions.question_body,
        questions.question_date,
        questions.asker_name,
        questions.question_helpfulness,
        questions.reported,
        (SELECT json_object_agg(
          answers.id,
          json_build_object(
            'id', answers.id,
            'body', answers.body,
            'date', answers.date,
            'answerer_name', answerer_name,
            'photos',
            (SELECT array_agg(json_build_object(
              'id', answers_photos.id,
              'url', answers_photos.url))
      FROM
        answers_photos
      WHERE
        answers_photos.id = answers.id)))
      FROM
        answers
      WHERE
        answers.id = questions.question_id)
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

  queryGetAnswers: (question_id) => new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT
        id
      FROM
        answers
      WHERE
        question_id = ${question_id}
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
