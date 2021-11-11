async function insertIntoTable(db, table, columns, values) {
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

module.exports = {
    insertIntoTable: insertIntoTable
}
