const read = require("./read");

async function updateTable(db, table, args) {
    if (args.endxcoord && args.endycoord) {
        manageB2p(db, args);
    }

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

    await db.query(sql, [table, columnsAndValues, columnToMatch, valueToMatch].flat());

    const updatedRow = await read.findInTable(db, table, columnToMatch, valueToMatch);

    return updatedRow[0];
}

async function manageB2p (db, args) {
    let bikeid = await db.query("SELECT bikeid FROM history WHERE ?? = ?;", [args.columnToMatch, args.valueToMatch]);
    bikeid = bikeid[0].bikeid;
    await db.query("DELETE FROM bike2parkingspace WHERE bikeid = ?", [bikeid]);
    
    const parkingspaces = await db.query("SELECT * FROM parkingspace;");
    
    parkingspaces.forEach(async parkingspace => {
        const distance = measureDistance(args.endxcoord, args.endycoord, parkingspace.xcoord, parkingspace.ycoord);
        
        if (distance <= 30) {
            await db.query("INSERT INTO bike2parkingspace (bikeid, parkingspaceid) VALUES (?, ?);", [bikeid, parkingspace.id]);
        }
    });
}

// Fancy math function borrowed from internet to calculate distance between two points.
function measureDistance(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}

module.exports = {
    updateTable: updateTable
}
