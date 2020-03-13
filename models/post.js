import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postType = {
  receiver: 0,
  finder: 1,
};

const postSchema = new Schema({
  name: { type: String, required: true },
  postType: Number,
  images: [String],
  content: String,
  address: String,
  pricePerDay: Number,
  isAvailable: Boolean,
  senId: { type: Schema.Types.ObjectId, ref: "User" },
  coordinate: [Number],
  likes: Number,
  createdAt: String,
  slug: String,
});

let Post = mongoose.model("Post", postSchema);

export default Post;
