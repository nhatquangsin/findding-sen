import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  role: { type: String, required: true },
  slug: { type: String, required: true },
  password: { type: String, required: true }
});

let User = mongoose.model("User", userSchema);

export default User;
