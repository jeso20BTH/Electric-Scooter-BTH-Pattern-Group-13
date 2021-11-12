// const express = require("express");

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectToDatabase = require("./db/database");
const read = require("./src/read");
const create = require("./src/create");
const update = require("./src/update");
const crudDelete = require("./src/delete");
const port = process.env.PORT || 1337;
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInputObjectType
} = require("graphql");

(async function () {
    const db = await connectToDatabase();
    const app = express();

    const CustomerType = new GraphQLObjectType({
        name: "Customer",
        description: "A customer",
        fields: () => ({
            id: { type: GraphQLInt },
            firstname: { type: GraphQLString },
            lastname: { type: GraphQLString },
            email: { type: GraphQLString },
            balance: { type: GraphQLInt }
        })
    });

    const BikeType = new GraphQLObjectType({
        name: "Bike",
        description: "A bike",
        fields: () => ({
            id: { type: GraphQLInt },
            available: { type: GraphQLInt },
            velocity: { type: GraphQLInt },
            battery: { type: GraphQLInt },
            xcoord: { type: GraphQLFloat },
            ycoord: { type: GraphQLFloat }
        })
    });

    const CityType = new GraphQLObjectType({
        name: "City",
        description: "A city",
        fields: () => ({
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            startingfee: { type: GraphQLInt },
            penaltyfee: { type: GraphQLInt },
            fee: { type: GraphQLInt },
            discount: { type: GraphQLInt }
        })
    });

    const HistoryType = new GraphQLObjectType({
        name: "History",
        description: "A history log",
        fields: () => ({
            id: { type: GraphQLInt },
            bikeid: { type: GraphQLInt },
            customerid: { type: GraphQLInt },
            starttime: { type: GraphQLString },
            endtime: { type: GraphQLString },
            startxcoord: { type: GraphQLFloat },
            startycoord: { type: GraphQLFloat },
            endxcoord: { type: GraphQLFloat },
            endycoord: { type: GraphQLFloat },
            payed: { type: GraphQLInt },
            cityid: { type: GraphQLInt},
            bike: { 
                type: BikeType,
                resolve: async (parent) => {
                    const bike = await read.findInTable(db, "bike", "id", parent.bikeid);
                    return bike[0];
                }
            },
            customer: { 
                type: CustomerType,
                resolve: async (parent) => {
                    const customer = await read.findInTable(db, "customer", "id", parent.customerid);
                    return customer[0];
                }
            },
            city: { 
                type: CityType,
                resolve: async (parent) => {
                    const city = await read.findInTable(db, "city", "id", parent.cityid);
                    return city[0];
                }
            }
        })
    });

    const ParkingspaceType = new GraphQLObjectType({
        name: "Parkingspace",
        description: "A parkingspace",
        fields: () => ({
            id: { type: GraphQLInt },
            xcoord: { type: GraphQLFloat },
            ycoord: { type: GraphQLFloat },
            name: { type: GraphQLString },
            cityid: { type: GraphQLInt },
            hascharger: { type: GraphQLInt },
            city: { 
                type: CityType,
                resolve: async (parent) => {
                    const city = await read.findInTable(db, "city", "id", parent.cityid);
                    return city[0];
                }
            },
            bikes: {
                type: new GraphQLList(BikeType),
                resolve: async (parent) => {
                    const b2p = await read.findInTable(db, "bike2parkingspace", "parkingspaceid", parent.id)

                    let bikes = b2p.map(async (b2pi) => {
                        let bike = await read.findInTable(db, "bike", "id", b2pi.bikeid);
                        return bike[0]
                    });

                    bikes = await Promise.all(bikes);

                    return bikes;
                }
            }
        })
    });

    const Bike2ParkingspaceType = new GraphQLObjectType({
        name: "Bike2Parkingspace",
        description: "A bike to parkingspace connection.",
        fields: () => ({
            id: { type: GraphQLInt },
            bikeid: { type: GraphQLInt },
            parkingspaceid: { type: GraphQLInt },
            parkingspace: { 
                type: ParkingspaceType,
                resolve: async (parent) => {
                    const parkingspace = await read.findInTable(db, "parkingspace", "id", parent.parkingspaceid);
                    return parkingspace[0];
                }
            },
            bike: { 
                type: BikeType,
                resolve: async (parent) => {
                    const bike = await read.findInTable(db, "bike", "id", parent.bikeid);
                    return bike[0];
                }
            }
        })
    });

    const RootQueryType = new GraphQLObjectType({
        name: "Query",
        description: "Root Query",
        fields: () => ({
            customer: {
                type: CustomerType,
                description: "A customer",
                args: {
                    id: { type: GraphQLInt },
                    email: { type: GraphQLString }
                },
                resolve: async (parent, args) => {
                    let customer;

                    if (args.id) {
                        customer = await read.findInTable(db, "customer", "id", args.id);
                    } else if (args.email) {
                        customer = await read.findInTable(db, "customer", "email", args.email);
                    }

                    return customer[0];
                }
            },
            customers: {
                type: new GraphQLList(CustomerType),
                description: "List of all customers",
                resolve: async () => {
                    const customers = await read.getFullTable(db, "customer");
                    return customers;
                }
            },
            bike: {
                type: BikeType,
                description: "A bike",
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: async (parent, args) => {
                    const bike = await read.findInTable(db, "bike", "id", args.id);
                    return bike[0];
                }
            },
            bikes: {
                type: new GraphQLList(BikeType),
                description: "List of all bikes",
                resolve: async () => {
                    const bikes = await read.getFullTable(db, "bike");
                    return bikes;
                }
            },
            cities: {
                type: new GraphQLList(CityType),
                description: "List of all cities",
                resolve: async () => {
                    const cities = await read.getFullTable(db, "city");
                    return cities;
                }
            },
            historylogs: {
                type: new GraphQLList(HistoryType),
                description: "List of all historylogs",
                resolve: async () => {
                    const historylogs = await read.getFullTable(db, "history");
                    return historylogs;
                }
            },
            parkingspaces: {
                type: new GraphQLList(ParkingspaceType),
                description: "List of parkingspaces",
                resolve: async () => {
                    const parkingspaces = await read.getFullTable(db, "parkingspace");
                    return parkingspaces;
                }
            },
            bike2parkingspaces: {
                type: new GraphQLList(Bike2ParkingspaceType),
                description: "List of bike to parking space connections.",
                resolve: async () => {
                    const bike2parkingspaces = await read.getFullTable(db, "bike2parkingspace");
                    return bike2parkingspaces;
                }
            }
        })
    });

    const DeleteType = new GraphQLObjectType({
        name: "Delete",
        description: "Delete mutation",
        fields: () => ({
            success: { type: GraphQLInt }
        })
    })

    const RootMutationType = new GraphQLObjectType({
        name: "Mutation",
        description: "Root Mutation",
        fields: () => ({
            addCustomer: {
                type: CustomerType,
                description: "Add a customer",
                args: {
                    firstname: { type: GraphQLString },
                    lastname: { type: GraphQLString },
                    email: { type: GraphQLString },
                    balance: { type: GraphQLInt}
                },
                resolve: async (parent, args) => {
                    const columns = ["firstname", "lastname", "email", "balance"];
                    const values = [args.firstname, args.lastname, args.email, args.balance];
                    const result = await create.insertIntoTable(db, "customer", columns, values);
                    const newCustomer = await read.findInTable(db, "customer", "id", result.insertId);

                    return newCustomer[0];
                }
            },
            addHistory: {
                type: HistoryType,
                description: "Add a history-log",
                args: {
                    bikeid: { type: GraphQLInt },
                    customerid: { type: GraphQLInt },
                    startxcoord: { type: GraphQLFloat },
                    startycoord: { type: GraphQLFloat },
                    cityid: { type: GraphQLInt },
                },
                resolve: async (parent, args) => {
                    const columns = ["bikeid", "customerid", "startxcoord", "startycoord", "cityid"];
                    const values = [args.bikeid, args.customerid, args.startxcoord, args.startycoord, args.cityid];
                    const result = await create.insertIntoTable(db, "history", columns, values);
                    const newHistory = await read.findInTable(db, "history", "id", result.insertId);

                    return newHistory[0];
                }
            },
            updateHistory: {
                type: HistoryType,
                description: "Update a history-log",
                args: {
                    endxcoord: { type: GraphQLFloat },
                    endycoord: { type: GraphQLFloat },
                    payed: { type: GraphQLInt },
                    columnToMatch: { type: GraphQLString },
                    valueToMatch: { type: GraphQLString }
                },
                resolve: async (parent, args) => {
                    const updatedHistory = await update.updateTable(db, "history", args);
                    
                    return updatedHistory;
                },
            },
            updateCustomer: {
                type: CustomerType,
                description: "Update a customer",
                args: {
                    firstname: { type: GraphQLString },
                    lastname: { type: GraphQLString },
                    email: { type: GraphQLString },
                    balance: { type: GraphQLInt },
                    columnToMatch: { type: GraphQLString },
                    valueToMatch: { type: GraphQLString }
                },
                resolve: async (parent, args) => {
                    const updatedCustomer = await update.updateTable(db, "customer", args);

                    return updatedCustomer;
                },
            },
            updateBike: {
                type: BikeType,
                description: "Update a Bike",
                args: {
                    available: { type: GraphQLInt },
                    velocity: { type: GraphQLInt },
                    battery: { type: GraphQLInt },
                    xcoord: { type: GraphQLFloat },
                    ycoord: { type: GraphQLFloat },
                    columnToMatch: { type: GraphQLString },
                    valueToMatch: { type: GraphQLString }
                },
                resolve: async (parent, args) => {
                    const updatedBike = await update.updateTable(db, "bike", args);

                    return updatedBike;
                },
            },
            deleteCustomer: {
                type: DeleteType,
                description: "Delete a customer",
                args: {
                    id: { type: GraphQLInt },
                    email: { type: GraphQLString }
                },
                resolve: async (parent, args) => {
                    let res;

                    if (args.id) {
                        res = await crudDelete.deleteFromTable(db, "customer", "id", args.id);
                    } else if (args.email) {
                        res = await crudDelete.deleteFromTable(db, "customer", "email", args.email);
                    }

                    return { success: res.affectedRows };
                },
            },
        })
    });

    const schema = new GraphQLSchema({
        query: RootQueryType,
        mutation: RootMutationType
    });

    app.use("/graphql", graphqlHTTP({
        schema: schema,
        graphiql: true
    }));

    app.listen(port, () => console.log(`Server is running on port ${port}`));
})();
