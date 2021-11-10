// const express = require("express");

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectToDatabase = require("./db/database");
const read = require("./src/read");
const port = process.env.PORT || 1337;
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLFloat
} = require("graphql");

(async function () {
    const db = await connectToDatabase();
    const app = express();

    const CustomerType = new GraphQLObjectType({
        name: "Customer",
        description: "A customer",
        fields: () => ({
            id: { type: new GraphQLNonNull(GraphQLInt) },
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
            id: { type: new GraphQLNonNull(GraphQLInt) },
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
            id: { type: new GraphQLNonNull(GraphQLInt) },
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
            id: { type: new GraphQLNonNull(GraphQLInt) },
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
            id: { type: new GraphQLNonNull(GraphQLInt) },
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
            id: { type: new GraphQLNonNull(GraphQLInt) },
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
            customers: {
                type: new GraphQLList(CustomerType),
                description: "List of all customers",
                resolve: async () => {
                    const customers = await read.getFullTable(db, "customer");
                    return customers;
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

    const schema = new GraphQLSchema({
        query: RootQueryType
    });








    app.use("/graphql", graphqlHTTP({
        schema: schema,
        graphiql: true
    }));

    app.listen(port, () => console.log(`Server is running on port ${port}`));
})();
