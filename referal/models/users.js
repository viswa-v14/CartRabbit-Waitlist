const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
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

  ref_id: {
    type: Number,
    required: true,
  },
  ref_by:{
    type: mongoose.Schema.Types.ObjectId,
     ref: "ref_user",
     required:false
  },
  ref_user_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "ref_user" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
