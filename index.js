const {sequelize, DataTypes, Model} = require('./db')
//import models
const { Musician } = require('./Musician')
const { Band } = require('./Band')

//associate models
//adds foreign key to musician table connecting a musician instance to a specific band
Musician.belongsTo(Band)
//gives us sequelize methods for a one to many relationship
Band.hasMany(Musician)

//export models with added associations
module.exports = {Musician, Band, sequelize}