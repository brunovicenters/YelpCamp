const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PLM = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.plugin(PLM);

module.exports = mongoose.model("User", UserSchema);
