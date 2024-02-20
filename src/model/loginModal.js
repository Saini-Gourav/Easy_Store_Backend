const { Schema, model } = require("mongoose");

const loginSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const loginModal = model("login", loginSchema);

module.exports = loginModal;
