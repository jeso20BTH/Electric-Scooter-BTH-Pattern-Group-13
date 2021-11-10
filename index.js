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
    GraphQLNonNull
} = require("graphql");

(async function () {
    const db = await connectToDatabase();
    const app = express();

    const RootQueryType = new GraphQLObjectType({
        name: "Query",
        description: "Root Query",
        fields: () => ({
            customers: {
                type: new GraphQLList(CustomerType),
                description: "List of all customers",
                resolve: () => {
                    const customers = read.getFullTable(db, "customer");
                    return customers;
                }
            }
        })
    });

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

    const schema = new GraphQLSchema({
        query: RootQueryType
    });









    app.use("/graphql", graphqlHTTP({
        schema: schema,
        graphiql: true
    }));

    app.listen(port, () => console.log(`Server is running on port ${port}`));
})();
