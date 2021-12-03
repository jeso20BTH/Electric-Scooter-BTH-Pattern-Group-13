'use strict';
import axios from 'axios';

console.log("5")

let parkingspaceInCity = 
    axios({
    url: "http://localhost:1337/graphql",
    method: "POST",
    data: ({
        query: `
        query {
            parkingspaces {
                id,
                xcoord,
                ycoord,
                name,
                cityid,
                hascharger,
            }
        }
        `
    })
}).then((result) => {
    console.log("6")
    return result.data.data.parkingspaces


});

export default parkingspaceInCity;

