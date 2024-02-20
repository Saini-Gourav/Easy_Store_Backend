const { Schema, model } = require("mongoose");

const userSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const userModel = model("product", userSchema);

module.exports = userModel;
