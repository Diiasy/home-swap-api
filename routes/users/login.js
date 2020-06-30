const express = require("express");
const app = express();
const User = require("../../models/User.js");
const bcryptjs = require('bcryptjs');

app.post('/', (req, res, next) => {
    const { email, username, password } = req.body;

    if ((email == null && username == null) || password == null) {
        debugger
        console.log(email, username, password)
        res.status(401).json({ errorMessage: 'Please enter both, email/username and password to login.' });
        return;
    }

    User.findOne({$or: [{username}, {email}]})
    .then(user => {
        if (!user) {
            res.status(401).json({ errorMessage: 'Email/username is not registered. Try with another or register.' });
            return;
        } else if (bcryptjs.compareSync(password, user.passwordHash)) {
            req.session.user = user;
            req.session.buyer = true;
            req.session.seller = false;
            res.json(user);
        } else {
            res.status(401).json({ errorMessage: 'Incorrect password.' });
        }
    })
    .catch(error => next(error));
});

module.exports = app;