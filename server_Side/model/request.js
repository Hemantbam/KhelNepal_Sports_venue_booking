const mongoose = require("mongoose");
const FriendScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requests: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
       
    }],
    friendsList: [{
        friend: {       type: mongoose.Schema.Types.ObjectId,
            ref: 'User', },
    }],
});

const Friends = mongoose.model("Friends", FriendScheme);

module.exports = Friends;
