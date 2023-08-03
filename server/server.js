// require express
const express = require('express');
// require path
const path = require('path');
// require connection
const db = require('./config/connection');
// require apollo server
const { ApolloServer } = require("apollo-server-express");
// const routes = require('./routes');  replaced by apollo server
// require typedefs & resolvers
const { typeDefs, resolvers } = require("./schema");
// app is express
const app = express();
// set up port
const PORT = process.env.PORT || 3001;
// user typedefs & resolvers in apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
// app use express 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// app.use(routes);  replace with client connection
// connect with client side
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
})
// set up apollo server & graphql
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`server port found: ${PORT}!`);
      console.log(`graphql port found: http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
// call to initiate
startApolloServer(typeDefs, resolvers);