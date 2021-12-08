const {sequelize, DataTypes, Model} = require('../db')

class Band extends Model {}

Band.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    albums: DataTypes.INTEGER
}, {
    sequelize,
    timestamps: false
})

module.exports = {Band}