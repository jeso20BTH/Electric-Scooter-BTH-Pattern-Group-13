// const express = require("express");

const connectToDatabase = require("./db/database");
const read = require("./src/read");

(async function () {
    const db = await connectToDatabase();
    let res = await read.getFullTable(db, "customer");

    console.log(res);
})();
