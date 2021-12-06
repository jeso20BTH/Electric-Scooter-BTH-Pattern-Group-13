'use strict';
import axios from 'axios';
// import allCities from '../models/city';



// let x = 1;
// // console.log(bikesInCity.cityId)
// allCities.then(function(result) {
//     console.log(result) // "Some User token"
//  })

console.log("1")

let bikesInCity = 
    axios({
    url: "http://localhost:1337/graphql",
    method: "POST",
    data: ({
        query: `
        query {
            bikes {
                id
                xcoord
                ycoord
            }
        }
        `
    })
    }).then((result) => {
        console.log("2")

        return result.data.data.city
    });



export default bikesInCity;

