const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const config = require('../config/database');

//Register
router.post('/register', function (req, res, next) {
    "use strict";
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser,  (err, user) => {
        if (err) {
           return res.json({success: false, msg: 'Failed to register user' });
        } else {
           return res.json({success: true, msg: 'User registered' });
        }
    });
});

//Authenticate
router.post('/authenticate', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByName(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        User.comparepwd(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //1week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});


module.exports = router;