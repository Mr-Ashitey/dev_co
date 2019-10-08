const mongoose = require("mongoose");
const Schema= mongoose.Schema;

//create signup schema
const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  secretToken: {
    type: String
  },
  active: {
    type: Boolean,
    required: true
  }
});

mongoose.model("users", UserSchema);