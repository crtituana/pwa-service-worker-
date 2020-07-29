;
'use strict'
const mongoose = require("mongoose");

const { Schema } = mongoose;

const cursoModel = Schema({
  title: { type: String },
  professor: { type: String },
  description: { type: String },
  topic: { type: String },
  participants: { type: Array },
  sessionID: { type: String },
  createAt: { type: Date },
});

module.exports = mongoose.model("Curso", cursoModel);
