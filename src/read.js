
async function getFullTable(db, table) {
    let sql = "SELECT * FROM ??";
    const res = await db.query(sql, [table]);

    return res;
}

module.exports = {
    getFullTable: getFullTable,
}