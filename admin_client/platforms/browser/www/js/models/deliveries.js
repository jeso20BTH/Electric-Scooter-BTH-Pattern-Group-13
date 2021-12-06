// "use strict";
// import axios from 'axios';
// import m from 'mithril';

// import {baseUrl, apiKey} from "../vars.js";
// import products from './products.js';

// console.log("hello")
// let deliveries = {
//     axios ({
//             method: "POST",
//             url: "http://localhost:1337/graphql",
//             data: ({
//                 query: `
//                 query {
//                     cities {
//                         id
//                         name
//                     }
//                 }
//                 `
//             })
//         })
//         .then((result) => {
//             console.log("hej")
//             deliveries.currentDeliveries = result.data.data.cities
//             console.log(deliveries.currentDeliveries);
//         })
// };

// console.log("2")

// export default deliveries;




// // return axios.request({
// //     method: "POST",
// //     url: "http://localhost:1337/graphql",
// //     data: ({
// //         query: `
// //         query {
// //             cities {
// //                 id
// //                 name
// //             }
// //         }
// //         `
// //     })
// // })
// // .then((result) => {
// //     console.log("hej")
// //     deliveries.currentDeliveries = result.data.data.cities
// //     console.log(deliveries.currentDeliveries);
// // })