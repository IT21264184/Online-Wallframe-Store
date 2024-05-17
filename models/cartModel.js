const config = require("config");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  itemCount:{type:Number},
  items:{type:Array[{}]}
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
exports.Cart = Cart;
