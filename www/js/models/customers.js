'use strict';
import axios from 'axios';


let allCustomers = 
    axios({
    url: "http://localhost:1337/graphql",
    method: "POST",
    data: ({
        query: `
        query { 
            customers {
                firstname,
                lastname,
                email,
                balance,
                paymentmethod,
            }
        }
        `
    })
}).then((result) => {
    return result.data.data.customers
});


export default allCustomers;


