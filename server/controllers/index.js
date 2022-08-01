const db = require('../db');

module.exports = {
  getQuestions: (req, res) => {
    const { product_id, page = 1, count = 5 } = req.query;
    db.queryGetQuestions(product_id, page, count)
      .then((data) => {
        res.status(200).send({ product_id, results: data });
      })
      .catch((err) => res.status(500).send(err));
  },

  getAnswers: (req, res) => {
    const { question_id } = req.params;
    const { page = 1, count = 5 } = req.query;

    db.queryGetAnswers(question_id, page, count)
      .then((data) => {
        res.status(200).send({ question: question_id, page, count, results: data });
      })
      .catch((err) => res.status(500).send(err));
  },

  postQuestion: (req, res) => {
    const { product_id, body, name, email } = req.body;
    db.queryPostQuestion(product_id, body, name, email)
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err));
  },

  postAnswer: (req, res) => {
    const { question_id } = req.params;
    const { body, name, email, photos } = req.body;

    db.queryPostAnswer(question_id, body, name, email, photos)
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err));
  },

  putQuestionHelpful: (req, res) => {
    const { question_id } = req.params;
    db.queryPutQuestionHelpful(question_id)
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err));
  },

  putQuestionReport: (req, res) => {
    const { question_id } = req.params;
    db.queryPutQuestionReport(question_id)
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err));
  },

  putAnswerHelpful: (req, res) => {
    const { answer_id } = req.params;
    db.queryPutAnswerHelpful(answer_id)
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err));
  },

  putAnswerReport: (req, res) => {
    const { answer_id } = req.params;
    db.queryPutAnswerReport(answer_id)
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err));
  },
};
