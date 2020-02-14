const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();
const port = 4000;

mongoose.connect(
  "mongodb://rmar8138:test123@ds211269.mlab.com:11269/graphql-demo"
);
mongoose.connection.once("open", () => {
  console.log("Connect to database!");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
