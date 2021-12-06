[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Dundgren/bikerental-api/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Dundgren/bikerental-api/?branch=main)[![Build Status](https://app.travis-ci.com/Dundgren/bikerental-api.svg?branch=main)](https://app.travis-ci.com/Dundgren/bikerental-api)

# bikerental-api

This api has been developed for use in the course "pattern" by the group project 13. This api utilizes graphql which means all entities can be found under the "/graphql" endpoint and are retrieved or manipulated by sending queries via post. To view a graphical interface go to "/graphql" in your browser. To query the api from your app use method "POST" and send your query by placing it inside the body-object with the key "query".

## Json web token
To receive your token send a post-request to "/register". Your body must contain an email adress with the key "mail" e.g { mail: myexamplemail@mail.com }. Save the token that is
returned as you will not be able to retrieve it again. To use your token place it in "headers" when making a request to "/graphql". Make sure the token has the key "jwt".

## Logging
When making a request to "/graphql" a new row containing your email, query and a timestamp will be added to a logfile. To read this logfile go to "/log"

## Customer
### Get all customers
All attributes are optional but at least one must be asked for.
WARNING: It is NOT advisable to retrieve historylogs when requesting all customers. A query to the history-table will be made for every single customer which will take a long time.
```
{
  customers {
    id,
    firstname,
    lastname,
    email,
    balance,
    paymentmethod,
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

```

### Add a customer
All parameters are optional but at least one must be provided.
```
mutation {
	addCustomer (firstname: "Daniel", lastname: "Lundgren", email: "kek@lol.se", balance: 99999, paymentmethod: "Card") {
    id,
    firstname,
    lastname,
    email,
    balance,
    paymentmethod
  }
}
```

### Update a customer
The required parameters for updating a customer are "columnToMatch", "valueToMatch" and at least one of the optional parameters. "valueToMatch" always needs to be a string even if an integer value is provided. In the example below the customer with the "email" "daniel@mail.com" is updated.
```
mutation {
	updateCustomer (firstname: "Daniel", lastname: "Lundgren", email: "kek@lol.se", balance: 99999, paymentmethod: "Card", columnToMatch: "email", valueToMatch: "daniel@mail.com") {
    id,
    firstname,
    lastname,
    email,
    balance,
    paymentmethod
  }
}
```

### Delete a customer
A customer is deleted using its id. Upon deletion every row referencing given customer in history will also be deleted. If the customer is successfully deleted succes will equal 1.
```
mutation {
  deleteCustomer (id: 6) {
	  success
  }
}
```

## Bike
### Get all bikes
All attributes are optional but at least one must be asked for.
WARNING: It is NOT advisable to retrieve city when requesting all bikes. A query to the city-table will be made for every single bike which will take a long time.
```
{
  bikes {
    id,
    available,
    velocity,
    battery,
    xcoord,
    ycoord,
    cityid,
    city {
      id,
      name,
      startingfee,
      penaltyfee,
      fee,
      discount,
      xcoord,
      ycoord
    }
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
    ycoord,
    cityid,
    city {
      id,
      name,
      startingfee,
      penaltyfee,
      fee,
      discount,
      xcoord,
      ycoord
    }
  }
}
```
### Update a bike
The required parameters for updating a bike are "columnToMatch", "valueToMatch" and at least one of the optional parameters. "valueToMatch" always needs to be a string even if an integer value is provided. In the example below the bike with the "id" of "3" is updated.
```
mutation {
  updateBike (available: 0, velocity: 42, battery: 99, xcoord: 56.1600575, ycoord: 15.5862748, cityid=3 columnToMatch: "id", valueToMatch: "3") {
    id,
    available,
    velocity,
    battery,
    xcoord,
    ycoord,
    cityid
  }
}
```

## City
### Get a specific city
```
{
  city (id: 3) {
    id,
    name,
    startingfee,
    penaltyfee,
    fee,
    discount,
    xcoord,
    ycoord
    bikes {
      id,
      available,
      velocity,
      battery,
      xcoord,
      ycoord,
      cityid
    }
  }
}
```

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
    discount,
    xcoord,
    ycoord
    bikes {
      id,
      available,
      velocity,
      battery,
      xcoord,
      ycoord,
      cityid
    }
  }
}
```

## Parkingspace
### Get all parkingspaces
All attributes are optional but at least one must be asked for.
```
{
  parkingspaces {
      id,
      xcoord,
      ycoord,
      name,
      cityid,
      hascharger,
      city {
        id,
        name,
        startingfee,
        penaltyfee,
        fee,
        discount,
        xcoord,
        ycoord
      }
      bikes {
        id,
        available,
        velocity,
        battery,
        xcoord,
        ycoord
    },
  }
}
```

## Bike2parkingspace
There is no need to create, update or delete a b2p. The b2p-connections are handled entirely automatically by checking if the endposition of a bike is within 30 metres of a parkingspace.

### Get all bike2parkingspaces
All attributes are optional but at least one must be asked for.
```
{
	bike2parkingspaces {
    id,
    bikeid,
    parkingspaceid,
    bike {
      id,
      available,
      velocity,
      battery,
      xcoord,
      ycoord
    },
    parkingspace  {
      id,
      xcoord,
      ycoord,
      name,
      cityid,
      hascharger
    }
  }
}
```

## History
"starttime" and "endtime" are received as a unix-timespamp in milliseconds.

### Get all history-logs
All attributes are optional but at least one must be asked for.
```
{
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
    endparking,
    bike {
      id,
      available,
      velocity,
      battery,
      xcoord,
      ycoord
    },
    customer {
      id,
      firstname,
      lastname,
      email,
      balance,
      paymentmethod
    }
  }
```

### Add a history-log
Make sure to provide all parameters when adding a history-log as these cant be updated later. Starttime is automatically generated in the database.
```
mutation {
  addHistory (bikeid: 1, customerid: 5, startxcoord: 56.1610417, startycoord: 15.5871389, cityid: 1) {
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
    bike {
      id,
      available,
      velocity,
      battery,
      xcoord,
      ycoord
    },
    customer {
      id,
      firstname,
      lastname,
      email,
      balance,
      paymentmethod
    }
  }
}
```

### Update a history-log
The required parameters for updating a history-log are "columnToMatch", "valueToMatch" and at least one of the optional parameters. "valueToMatch" always needs to be a string even if an integer value is provided. In the example below the history-log with the "id" of 10 is updated. The endtime is automatically generated in the database.
```
mutation {
  updateHistory (endxcoord: 56.1610315, endycoord: 15.5871221, payed: 1, columnToMatch: "id", valueToMatch: "10") {
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
    endparking,
    bike {
      id,
      available,
      velocity,
      battery,
      xcoord,
      ycoord
    },
    customer {
      id,
      firstname,
      lastname,
      email,
      balance,
      paymentmethod
    }
  }
}
```
