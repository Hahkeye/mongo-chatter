const express = require('express');
const mongo = require('./config/connect');
const routes = require('./controllers');//change this

const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars.registerPartial('postP','{{prefix}}');
mongo.test;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);



// sync sequelize models to the database, then turn on the server
async function start(){
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT} !`);
  });
}
start();

