const mongoose = require("mongoose");
const { Schema } = mongoose;
const NotesSchema = new Schema({
  title: {
    type: string,
    require: true,
  },
  description: {
    type: string,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
