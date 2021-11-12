[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Dundgren/bikerental-api/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Dundgren/bikerental-api/?branch=main)[![Build Status](https://app.travis-ci.com/Dundgren/bikerental-api.svg?branch=main)](https://app.travis-ci.com/Dundgren/bikerental-api)

# bikerental-api

This api has been developed for use in the course "pattern" by the group project 13. This api utilizes graphql which means all entities can be found under the "/graphql" endpoint and are retrieved or manipulated by sending queries via post. To view a graphical interface go to "/graphql" in your browser. To query the api from your app use method "POST" and send your query by placing it inside the body-object with the key "query".

## Customer
### Get all customers
All attributes are optional but at least one must be asked for.
```
{
  customers {
    id,
    firstname,
    lastname,
    email,
    balance
  }
}
```
### Get a specific customer
You can get a specific customer by providing either id or email. If both are provided customer is found using id.
```
{
  customer(id: 4, email: "jgawkes2@bandcamp.com") {
    id,
    firstname,
    lastname,
    email,
    balance
  }
}
```
### Delete a customer
If the customer to be deleted is referenced in any other table the query will fail. This mutation is almost useless but is kept anyways.
You can delete a customer by providing either an id or an email. If both are provided customer is deleted using id.
```
mutation {
  deleteCustomer (id: 6, email: "jgawkes2@bandcamp.com") {
		success
  }
}
```
