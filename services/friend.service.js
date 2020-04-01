import Friend from "../models/friend";

export const findFriendsOfUser = async (userId) => {
    const friends_a_tx = await Friend.find({ userId });
    const friends_a = friends_a_tx.map(a => a.friendId);
    const friends_b_tx = await Friend.find({ friendId: userId });
    const friends_b = friends_b_tx.map(b => b.userId);

    return [...friends_a, ...friends_b];
};
