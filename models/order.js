const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    _id: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    paymentStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
