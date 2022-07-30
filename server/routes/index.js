const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/questions/', controllers.getQuestions);
router.get('/questions/:question_id/answers/', controllers.getAnswers);

router.post('/questions/', controllers.postQuestion);
router.post('/questions/:question_id/answers/', controllers.postAnswer);

router.put('/questions/:question_id/helpful/', controllers.putQuestionHelpful);
router.put('/questions/:question_id/report/', controllers.putQuestionReport);
router.put('/answers/:answer_id/helpful/', controllers.putAnswerHelpful);
router.put('/answers/:answer_id/report/', controllers.putAnswerReport);

module.exports = router;
