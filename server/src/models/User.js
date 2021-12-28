const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    cash: {
      type: Number,
      required: true,
    },
    wallet: [
      {
        symbol: String,
        quantity: Number,
        amountInvested: Number,
      },
    ],
  },
  { timestamps: true },
);

module.exports = model('User', UserSchema);
