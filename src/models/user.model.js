const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

UserSchema.statics.signup = async function (name, email, password) {
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hash });
  return user;
};

module.exports = mongoose.model("users", UserSchema);
