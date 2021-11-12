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
### Update a customer
The required parameters for updating a customer are "columnToMatch", "valueToMatch" and at least one of the optional parameters. "valueToMatch" always needs to be a string even if an integer value is provided. In the example below the customer with the "email" "daniel@mail.com" is updated.
```
mutation {
	updateCustomer (firstname: "Daniel", lastname: "Lundgren", email: "kek@lol.se", balance: 99999, columnToMatch: "email", valueToMatch: "daniel@mail.com") {
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

## Bike
### Get all bikes
All attributes are optional but at least one must be asked for.
```
{
  bikes {
    id,
    available,
    velocity,
    battery,
    xcoord,
    ycoord
  }
}
```
### Get a specific bike
```
{
  bike (id: 3) {
    id,
    available,
    velocity,
    battery,
    xcoord,
    ycoord
  }
}
```
### Update a bike
The required parameters for updating a bike are "columnToMatch", "valueToMatch" and at least one of the optional parameters. "valueToMatch" always needs to be a string even if an integer value is provided. In the example below the bike with the "id" of "3" is updated.
```
mutation {
  updateBike (available: 0, velocity: 42, battery: 99, xcoord: 56.1600575, ycoord: 15.5862748, columnToMatch: "id", valueToMatch: "3") {
    id,
    available,
    velocity,
    battery,
    xcoord,
    ycoord
  }
}
```

## Cities
### Get all cities
All attributes are optional but at least one must be asked for.
```
{
  cities {
    id,
    name,
    startingfee,
    penaltyfee,
    fee,
    discount
  }
}
```
