async function insertIntoTable(db, table, columns, values) {
    if (table == "history") {
        const isParked = await checkParking(db, values[0]);

        columns.push("startparking");
        values.push(isParked);
    }

    let columnString = "";
    let valueString = "";

    for (let i = 0; i < values.length; i++) {
        columnString += "??, ";
        valueString += "?, ";
    }

    columnString = columnString.slice(0, -2);
    valueString = valueString.slice(0, -2);

    const sql = `
        INSERT INTO ?? (${columnString})
        VALUES (${valueString});
    `;

    const res = await db.query(sql, [table, columns, values].flat());

    return res;
}

async function checkParking(db, bikeid) {
    const b2p = await db.query("SELECT * FROM bike2parkingspace WHERE bikeid = ?;", [bikeid]);
    let res;

    if (b2p === undefined || b2p.length == 0) {
        res = "unparked";
    } else {
        res = "parked";
    }

    return res;
}

module.exports = {
    insertIntoTable: insertIntoTable
}
