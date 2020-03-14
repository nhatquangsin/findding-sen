import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    follower: { type: Schema.Types.ObjectID, ref: "User" },
});

let Follow = mongoose.model("Follow", FollowSchema);

export default Follow;
