const db = require('../db');

module.exports = {
  getQuestions: (req, res) => {
    const { product_id, page, count } = req.query;

    db.queryGetQuestions(product_id, page, count)
      .then((data) => {
        res.status(200).send({ product_id, results: data });
      })
      .catch((err) => res.status(404).send(err));
  },

  getAnswers: (req, res) => {
    const { question_id } = req.params;
    const { page, count } = req.query;

    console.log('question_id: ', question_id);
    console.log('page: ', page || 1);
    console.log('count: ', count || 5);
    res.sendStatus(200);
  },

  postQuestion: (req, res) => {
    const { body, name, email, product_id } = req.query;
    console.log('product_id: ', product_id);
    console.log('body: ', body);
    console.log('name: ', name);
    console.log('email: ', email);
    res.sendStatus(201);
  },

  postAnswer: (req, res) => {
    const { question_id } = req.params;
    const { body, name, email, photos } = req.query;
    console.log('question_id: ', question_id);
    console.log('body: ', body);
    console.log('name: ', name);
    console.log('email: ', email);
    console.log('photos: ', photos);
    res.sendStatus(201);
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
