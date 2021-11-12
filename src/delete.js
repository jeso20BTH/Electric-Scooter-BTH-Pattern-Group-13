async function deleteFromTable(db, table, columnToMatch, valueToMatch) {
    const sql = "DELETE FROM ?? WHERE ?? = ? LIMIT 1;";

    const res = await db.query(sql, [table, columnToMatch, valueToMatch]);

    return res;
}

module.exports = {
    deleteFromTable: deleteFromTable
}