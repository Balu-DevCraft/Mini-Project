const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  img: { type: String, required: true },
  certificateId: { type: String, required: true, unique: true },
  uniqueCode: { type: String, required: true, unique: true }, // Added uniqueCode
  name: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  approved: { type: Boolean, default: false }, // Optional: if you want to track approval status
});

const ItemModel = mongoose.model("Item", ItemSchema);

module.exports = ItemModel;
