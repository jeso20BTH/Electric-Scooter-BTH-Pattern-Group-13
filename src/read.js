async function getFullTable(db, table) {
    let sql = "SELECT * FROM ??";
    const res = await db.query(sql, [table]);

    return res;
}

async function findInTable(db, table, column, toMatch) {
    let sql = `
    SELECT 
        * 
    FROM ??
    WHERE
        ?? = ?
    `;
    const res = await db.query(sql, [table, column, toMatch]);

    return res;
}

module.exports = {
    getFullTable: getFullTable,
    findInTable: findInTable,
}
