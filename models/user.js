import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  role: { type: String, required: true },
  slug: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.methods.comparePassword = inputPassword => {
  return bcrypt.compareSync(inputPassword, this.password);
};

let User = mongoose.model("User", userSchema);

export default User;
