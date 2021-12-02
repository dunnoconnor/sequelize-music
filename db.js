const {Sequelize , DataTypes, Model} = require('sequelize')

//create a database named 'sequelize'
//we will add models to this db in index
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite', //type of SQL,
    storage: './music.sqlite', //file location for db
    logging: false
})

module.exports = {sequelize, DataTypes, Model}