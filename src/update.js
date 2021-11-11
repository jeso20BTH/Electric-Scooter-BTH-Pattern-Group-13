async function updateTable(db, table, args) {
    let setString = "";
    let columnsAndValues = [];
    const columnToMatch = args.columnToMatch;
    const valueToMatch = args.valueToMatch;
    delete args.columnToMatch;
    delete args.valueToMatch;

    for (const [key, value] of Object.entries(args)) {
        columnsAndValues.push(key);
        columnsAndValues.push(value);
        setString += "?? = ?, ";
    }

    setString = setString.slice(0, -2);

    const sql = `
        UPDATE ??
        SET
            ${setString}
        WHERE
            ?? = ?
        LIMIT 1
        ;
    `;

    const res = await db.query(sql, [table, columnsAndValues, columnToMatch, valueToMatch].flat());

    return res;
}

module.exports = {
    updateTable: updateTable
}
