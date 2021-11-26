"use strict";

const express = require("express");
const registerRouter = express.Router();
const secret = require("../db/config.json").secret;
const jwt = require("jsonwebtoken");

registerRouter.post("/register", function(req, res) {
    const token = jwt.sign({ mail: req.body.mail }, secret);

    res.send(token);
});

module.exports = registerRouter;
