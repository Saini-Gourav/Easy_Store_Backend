const { Schema, model } = require("mongoose");

const registerSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const registerModal = model("auth", registerSchema);

module.exports = registerModal;
