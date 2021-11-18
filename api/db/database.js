"use strict"

const mysql = require("promise-mysql");
const config = require("./config.json");

async function connectToDatabase () {
    const db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });

    return db;
}

module.exports = connectToDatabase;
