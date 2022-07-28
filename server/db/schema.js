const mongoose = require('mongoose');

const { Schema } = mongoose;

const qaSchema = new Schema({
  product_id: {
    type: Number,
    required: true,
  },
  question_body: {
    type: String,
    required: true,
    maxLength: 1000,
  },
  question_date: {
    type: Number,
    required: true,
  },
  asker_name: {
    type: String,
    required: true,
    maxLength: 60,
  },
  asker_email: {
    type: String,
    required: true,
    maxLength: 60,
  },
  question_helpfulness: {
    type: Number,
    required: true,
    default: 0,
  },
  reported: {
    type: Boolean,
    required: true,
    default: false,
  },
  answers: {
    answer_id: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      required: true,
      maxLength: 60,
    },
    date: {
      type: Number,
      required: true,
    },
    answerer_name: {
      type: String,
      required: true,
      maxLength: 60,
    },
    answerer_email: {
      type: String,
      required: true,
      maxLength: 60,
    },
    helpfulness: {
      type: Number,
      required: true,
      default: 0,
    },
    reported: {
      type: Boolean,
      required: true,
      default: false,
    },
    photos: [],
  },
});

module.exports = mongoose.model('Qa', qaSchema);
