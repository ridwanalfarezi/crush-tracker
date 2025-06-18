import mongoose from "mongoose";

const crushSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["temen", "gebetan", "mantan"],
  },
  note: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Crush = mongoose.model("Crush", crushSchema);

export default Crush;