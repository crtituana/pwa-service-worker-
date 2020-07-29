const mongoose = require("mongoose");

const { Schema } = mongoose;

const rolModel = Schema({
  name: { type: String },
  description: { type: String },
  createAt: { type: Date },
});

module.exports = mongoose.model("Rol", rolModel);
