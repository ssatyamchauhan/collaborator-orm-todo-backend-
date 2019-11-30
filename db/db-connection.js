
// const Sequelize = require('sequelize');
// const config = require('../config')

// module.exports = () => {

//     const Op = Sequelize.Op;
//     var sequelize = new Sequelize(config.key.database, config.key.user, config.key.password, {
//         host: config.key.host,
//         dialect: "mysql",
//         define: {
//             underscored: true
//         }
//         // operatorAliases: false
//     });

//     sequelize.query('CREATE DATABASE IF NOT EXISTS utodo')
//         .then(() => {
//             console.log('Database is created successfully!')
//         })
//         .catch(err => {
//             console.log('ERROR in DATABASE CREATION!', err)
//         })

//     sequelize.authenticate()
//         .then(function () {
//             console.log("CONNECTED! ");
//         })
//         .catch(function (err) {
//             console.log("SOMETHING DONE GOOFED");
//         })
//         .done();

//     // Connect all the models/tables in the database to a db object, 
//     //so everything is accessible via one object
//     const db = {}
//     db.Op = Op;
//     db.Sequelize = Sequelize;
//     db.sequelize = sequelize;

//     // Models/Tables
//     db.user = require('./models/user.js')(Sequelize, sequelize)
//     db.card = require('./models/card.js')(Sequelize, sequelize)
//     db.todo = require('./models/todo.js')(Sequelize, sequelize)
//     db.bucket = require('./models/bucket.js')(Sequelize, sequelize)
//     db.comments = require('./models/comments.js')(Sequelize, sequelize)

//     // console.log(db)

//     //Syncing the modification into the database;
//     db.sequelize.sync()
//         .then(() => {
//             console.log('modification has been implemented to the database')
//         })
//         .catch(err => {         
//             console.log('Modification failed due to some weird errors',err)
//         })

//     return db;
// }