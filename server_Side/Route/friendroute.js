const express = require('express');
const router = express.Router();
const friendsController = require('../scheme/friend');

// Route to send friend request
router.post('/send-request', friendsController.sendFriendRequest);

// Route to accept or reject friend request
router.post('/respond-request', friendsController.acceptOrRejectRequest);

// Route to get friend list
router.get('/friends-list/:userId', friendsController.getFriendList);

router.get('/getfrienddata/:userId', friendsController.getFriendUser);
module.exports = router;
