require('dotenv').config();
const Mongo = require("mongoose");



const test = async () =>{
  const bongos = await Mongo.connect(`mongodb://localhost/${pro.env.DB_NAME}`)
  console.log(bongos);
}


// async function connect(){
//   const bongos = await Mongo.connect(`mongodb://localhost/${pro.env.DB_NAME}`)
//   console.log(bongos);
// }

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306,
    
//   }
// );


module.exports = test;
