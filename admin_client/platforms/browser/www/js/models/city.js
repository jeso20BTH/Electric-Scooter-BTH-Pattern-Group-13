'use strict';
import axios from 'axios';



let allCities = 
    axios({
    url: "http://localhost:1337/graphql",
    method: "POST",
    data: ({
        query: `
        query {
            cities {
                id,
                name,
            }
        }
        `
    })
}).then((result) => {
    return result.data
});





export default allCities;

