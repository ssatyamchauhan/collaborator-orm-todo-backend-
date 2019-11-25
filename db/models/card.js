module.exports = (Sequelize, sequelize) => {

    var card = sequelize.define('card', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdon: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    return card;
}


// var knex = require('knex')({ client: 'mysql', connection: config.key });

// knex.schema.hasTable('card').then(function (exists) {
//     // console.log(exists)
//     if (!exists) {
//         return knex.schema.createTable('card', function (t) {
//             t.increments('id').primary();
//             t.string('email').notNullable();
//             t.string('createdon').notNullable();
//             t.string('name').notNullable();
//         });
//     }
// });
// knex.schema.hasTable('user').then(function (exists) {
//     // console.log(exists)
//     if (!exists) {
//         return knex.schema.createTable('user', function (t) {
//             t.increments('id').primary();
//             t.string('name').notNullable();
//             t.string('email').unique().notNullable()
//             t.string('password').notNullable()
//         });
//     }
// });

// knex.schema.hasTable('bucket').then(function (exists) {
//     // console.log(exists)
//     if (!exists) {
//         return knex.schema.createTable('bucket', function (t) {
//             t.increments('id').primary();
//             t.integer('todoid').notNullable();
//             t.string('name').notNullable();
//             t.string('filename').notNullable();
//             t.string('location').notNullable();
//         });
//     }
// });

// knex.schema.hasTable('comments').then(function(exists) {
    
//     if(!exists){
//         return knex.schema.createTable('comments', function (t) {
//             t.increments('id').primary();
//             t.integer('todoid').notNullable();
//             t.string('name').notNullable();
//             t.string('email').notNullable();
//             t.string('comment');
//             t.integer('parentid');
//         })
//     }
// })

// knex.schema.hasTable('todo').then(function (exists) {
//     // console.log(exists)
//     if (!exists) {
//         return knex.schema.createTable('todo', function (t) {
//             t.increments('id').primary();
//             t.string('todo').notNullable();
//             t.boolean('done').notNullable();
//             t.string('assignedby').notNullable();
//             t.string('assignedto').notNullable();
//             t.string('description')
//             t.integer('projectid').notNullable();
//         });
//     }
// });