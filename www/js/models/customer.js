import { request, gql } from 'graphql-request';

const endpoint = 'http://localhost:1337/graphql';

var customerModel = {
  currentCustomer: null,
  getCustomerByEmail: async (email) => {
    const query = gql`
        query getCustomer($email: String!) {
          customer(email: $email) {
            id,
            firstname,
            lastname,
            email,
            balance,
            paymentmethod
            historylogs {
              id,
              bikeid,
              customerid,
              starttime,
              endtime,
              startxcoord,
              startycoord,
              endxcoord,
              endycoord,
              payed,
              cityid,
              startparking,
              endparking
            }
          }
        }
      `
      const variables = {
        email: email,
      }
      const getData = () => {
        return new Promise(resolve => {
          request(endpoint, query, variables).then((res) => {
            resolve(res.customer);
          }).catch((error) => { console.log(error); });
        })
      }
      
      customerModel.currentCustomer = await getData();
      return customerModel.currentCustomer;
  }
}

export { customerModel };