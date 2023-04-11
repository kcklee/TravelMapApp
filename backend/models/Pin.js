const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
      min: 3,
    },
    desc: {
      type: String,
      require: true,
      min: 0,
      max: 5,
    },

    year: {
      type: Number,
      require: false,
    },

    trip: {
      type: String,
      require: true,
    },

    haveVisited: {
      type: Boolean,
      require: true,
    },

    lat: {
      type: Number,
      require: true,
    },

    long: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
