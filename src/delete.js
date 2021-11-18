async function deleteFromTable(db, table, columnToMatch, valueToMatch) {
    if (table == "customer") {
        await db.query("DELETE FROM history WHERE customerid = ?", [valueToMatch])
    }

    const sql = "DELETE FROM ?? WHERE ?? = ? LIMIT 1;";

    const res = await db.query(sql, [table, columnToMatch, valueToMatch]);

    return res;
}

module.exports = {
    deleteFromTable: deleteFromTable
}