const express = require("express");
const app = express();
const User = require("../../models/User.js");
const bcryptjs = require('bcryptjs');

app.post('/', (req, res, next) => {
    const { email, username, password } = req.body;

    if ((email === '' && username === '') || password === '') {
        console.log(email, username, password)
        debugger
        res.status(401).json({ errorMessage: 'Please enter both, email/username and password to login.' });
        return;
    }

    User.findOne({$or: [{username}, {email}]})
    .then(user => {
        if (!user) {
            debugger
            res.status(401).json({ errorMessage: 'Email/username is not registered. Try with another or register.' });
            return;
        } else if (bcryptjs.compareSync(password, user.passwordHash)) {
            req.session.user = user;
            res.json(user);
        } else {
            debugger
            res.status(401).json({ errorMessage: 'Incorrect password.' });
        }
    })
    .catch(error => next(error));
});

module.exports = app;