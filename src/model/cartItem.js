const { Schema, model } = require("mongoose");

const cartItemSchema = Schema({
  product_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  bill_created: {
    type: Boolean,
    default: false,
  }
});

const CartItem = model("CartItem", cartItemSchema);

module.exports = CartItem;
