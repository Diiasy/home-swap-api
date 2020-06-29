const express = require("express");
const app = express();

app.get('/', (req, res) => {
    req.session.destroy();
    res.json({ message: 'We hope to see you soon' })
});

module.exports = app;