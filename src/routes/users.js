'use strict';
const router = require('express').Router();
const users = require('../controllers/users');
const auth = require('../middleware/auth');
const parse = require('../middleware/parse');
const images = require('../middleware/images');

// This route checks if a username is available
router.route('/available-username').get(users.findUsername);
router.route('/signup').post(images.uploadProfilePic, images.resizeImage, parse.trimBodyEmail, users.signup);
router.route('/login').post(parse.trimBodyEmail, users.login);
// This route gets the profile for users who have a valid jwt
router.route('/profile').get(auth.isAuthenticated, users.profile);
router.route('/update').put(auth.isAuthenticated, images.uploadProfilePic, images.resizeImage, parse.trimBodyEmail, users.update);
router.route('/delete').delete(auth.isAuthenticated, users.delete);

module.exports = router;