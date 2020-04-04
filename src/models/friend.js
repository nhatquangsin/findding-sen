import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    friendId: { type: Schema.Types.ObjectID, ref: "User" },
});

let Friend = mongoose.model("Friend", FriendSchema);

export default Friend;
