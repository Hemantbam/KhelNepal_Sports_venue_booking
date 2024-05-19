const { jwtSecret } = require('../Datas');
const Friends = require('../model/request');
const User = require('../model/user');

// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        if (senderId === receiverId) {
            return res.status(400).json({ message: 'Cannot send friend request to yourself' });
        }

        // Check if the request already exists
        const existingRequest = await Friends.findOne({
            user: senderId,
            'requests.sender': senderId,
            'requests.receiver': receiverId
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent to this user' });
        }

        // Create a new friend request
        await Friends.updateOne(
            { user: senderId },
            { $push: { requests: { sender: senderId, receiver: receiverId } } },
            { upsert: true }
        );
        await Friends.updateOne(
            { user: receiverId },
            { $push: { requests: { sender: senderId, receiver: receiverId } } },
            { upsert: true }
        );

        return res.status(200).json({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.error('Error sending friend request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const jwt = require('jsonwebtoken');


exports.acceptOrRejectRequest = async (req, res) => {
    const { senderId, receiverId, action } = req.body;
    const authHeader = req.headers['authorization'];

    try {
        // Check if Authorization header with Bearer token exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Missing bearer token' });
        }

        const token = authHeader.split(' ')[1]; // Extract token from Authorization header
        const decoded = jwt.verify(token, jwtSecret); // Verify and decode the token

        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        const senderIdFromToken = decoded.id;
        console.log(senderIdFromToken, " ", senderId, " ", receiverId);
        // Verify that the senderId in the token matches the senderId from the request body
        // Verify the authorization based on the action
        if (action === 'accept') {
            // For accepting a request, the receiverId must match the senderId from the token
            if (senderIdFromToken !== receiverId) {
                return res.status(403).json({ message: 'Forbidden: Receiver ID in token does not match receiver ID in request' });
            }
        } else if (action === 'reject' ) {
            // For rejecting or canceling a request, the senderId must match the senderId from the token
            if (senderIdFromToken !== receiverId) {
                return res.status(403).json({ message: 'Forbidden: Sender ID in token does not match sender ID in request' });
            }
        } else if ( action === 'cancel') {
            // For rejecting or canceling a request, the senderId must match the senderId from the token
            if (senderIdFromToken !== senderId) {
                return res.status(403).json({ message: 'Forbidden: Sender ID in token does not match sender ID in request' });
            }
        } 
         else if (action === 'remove') {
            // For removing a friend, the senderId must match the senderId from the token
            if (senderIdFromToken !== senderId) {
                return res.status(403).json({ message: 'Forbidden: Sender ID in token does not match sender ID in request' });
            }
        } else {
            // Handle any other action here, if needed
            return res.status(400).json({ message: 'Bad request: Invalid action' });
        }


        if (action === 'accept') {
            // Process accept action
            // Update receiver's and sender's friendsList and requests arrays
            await Friends.updateOne(
                { user: receiverId },
                { $pull: { requests: { sender: senderId, receiver: receiverId } }, $push: { friendsList: { friend: senderId } } }
            );

            await Friends.updateOne(
                { user: senderId },
                { $pull: { requests: { sender: senderId, receiver: receiverId } }, $push: { friendsList: { friend: receiverId } } }
            );
        } else if (action === 'remove') {
            // Process remove action
            // Update friendsList to remove the friend from both users
            await Friends.updateOne(
                { user: receiverId },
                { $pull: { friendsList: { friend: senderId } } }
            );
            await Friends.updateOne(
                { user: senderId },
                { $pull: { friendsList: { friend: receiverId } } }
            );
            console.log('Removed');
        } else {
            // Process reject or cancel action
            // Update requests array to remove the request
            await Friends.updateOne(
                { user: receiverId },
                { $pull: { requests: { sender: senderId, receiver: receiverId } } }
            );

            await Friends.updateOne(
                { user: senderId },
                { $pull: { requests: { sender: senderId, receiver: receiverId } } }
            );

            if (action === 'reject') {
                console.log("Rejected request");
                // Additional logic for rejection if needed
            } else if (action === 'cancel') {
                console.log("Cancelled request");
                // Additional logic for cancellation if needed
            }
        }

        return res.status(200).json({ message: 'Friend request processed successfully' });
    } catch (error) {
        console.error('Error processing friend request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



// Get Friend List
exports.getFriendList = async (req, res) => {
    const { userId } = req.params;

    try {
        const friendData = await Friends.findOne({ user: userId });

        if (!friendData) {
            return res.status(404).json({ message: 'Friend list not found' });
        }

        // const friends = friendData.friendsList.map(friend => friend.friendId);

        return res.status(200).json({ friendData });
    } catch (error) {
        console.error('Error fetching friend list:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getFriendUser = async (req, res) => {
    const { userId } = req.params;
    const authHeader = req.headers['authorization'];
    
    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Missing bearer token' });
        }

        const token = authHeader.split(' ')[1]; // Extract token from Authorization header
        const decoded = jwt.verify(token, jwtSecret); // Verify and decode the token

        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        const friendData = await Friends.findOne({ user: decoded.id });

        if (!friendData) {
            return res.status(403).json({ message: 'Forbidden: User is not a friend' });
        }

        // Extract an array of friend IDs from friendData.friendsList
        const friendIds = friendData.friendsList.map(friend => friend.friend.toString());

        // Check if userId exists in the array of friend IDs
        if (!friendIds.includes(userId)) {
            return res.status(403).json({ message: 'Forbidden: User is not a friend' });
        }

        const userData = await User.findOne({ _id:userId }, 'email phoneNumber address');

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ userData });
        
    } catch (error) {
        console.error('Error fetching friend user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
