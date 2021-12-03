'use strict';
import axios from 'axios';


console.log("3")

let allCities = 
    axios({
    url: "http://localhost:1337/graphql",
    method: "POST",
    data: ({
        query: `
        query {
            cities {
                id
                name
            }
        }
        `
    })
}).then((result) => {
    console.log("4")
    return result.data
});




export default allCities;

