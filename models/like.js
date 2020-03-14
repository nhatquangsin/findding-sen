import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
});

let Like = mongoose.model("Like", LikeSchema);

export default Like;
