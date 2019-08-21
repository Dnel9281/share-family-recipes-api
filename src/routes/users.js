'use strict';
const router = require('express').Router();
const users = require('../controllers/users');
const auth = require('../middleware/auth');
const trim = require('../middleware/trim');
const images = require('../middleware/images');

// This route checks if a username is available
router.route('/available-username').get(users.findUsername);
router.route('/signup').post(trim.trimBodyEmail, images.uploadProfilePic, images.resizeImage, users.signup);
router.route('/login').post(trim.trimBodyEmail, users.login);
// This route gets the profile for users who have a valid jwt
router.route('/profile').get(auth.isAuthenticated, users.profile);
router.route('/update').put(trim.trimBodyEmail, auth.isAuthenticated, images.uploadProfilePic, users.update);
router.route('/delete').delete(auth.isAuthenticated, users.delete);

module.exports = router;