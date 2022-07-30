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
    const { product_id, body, name, email } = req.query;

    db.queryPostQuestion(product_id, body, name, email)
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err));
  },

  postAnswer: (req, res) => {
    const { question_id } = req.params;
    const { body, name, email, photos } = req.query;

    db.queryPostAnswer(question_id, body, name, email, photos)
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err));
  },

  putQuestionHelpful: (req, res) => {
    const { question_id } = req.params;
    console.log('question_id', question_id);
    res.sendStatus(204);
  },

  putQuestionReport: (req, res) => {
    const { question_id } = req.params;
    console.log('question_id', question_id);
    res.sendStatus(204);
  },

  putAnswerHelpful: (req, res) => {
    const { answer_id } = req.params;
    console.log('answer_id', answer_id);
    res.sendStatus(204);
  },

  putAnswerReport: (req, res) => {
    const { answer_id } = req.params;
    console.log('answer_id', answer_id);
    res.sendStatus(204);
  },
};
