const {sequelize} = require('./db')
const {Musician} = require('./index')

//test musician database CRUD
describe('Muscian Database', () => {
    //force sync database
    beforeAll(async() => {
        //reset database
        await sequelize.sync({force:true})
        //create array of musicians
        const arrayOfMusicians =[
            {name: 'Prince', instrument: 'all', albums: 39},
            {name: 'David Bowie', instrument: 'guitar', albums: 26},
            {name: 'Kasem', instrument: 'dhol', albums: 1},
        ]
        //add array to database
        await Musician.bulkCreate(arrayOfMusicians)
    })

    //create instances of Musician Model for testin
    test('musicians have name', async() => {
        //read test instance from db
        const testMusician = await Musician.findOne({
            where: {
              name: 'Prince'
            }
          });
        expect(testMusician.name).toBe('Prince')
    })

    test('musicians have an instrument', async() => {
        //read test instance from db
        const testMusician = await Musician.findOne({
            where: {
              name: 'Prince'
            }
          });
        expect(testMusician.instrument).toBe('all')
    })

})