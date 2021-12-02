const {sequelize} = require('./db')
const {Musician} = require('./index')
describe('Muscian Database', () => {
    beforeAll(async() => {
        await sequelize.sync({force:true})
    })

    test('can create a musician', async() => {
        await Musician.create({name: 'Prince', instrument: 'guitar'})
        // const musicians = await Musician.findAll();
        // console.log(musicians)
        const testMusician = await Musician.findOne({
            where: {
              name: 'Prince'
            }
          });
        expect(testMusician.name).toBe('Prince')
        expect(testMusician.instrument).toBe('guitar')
    
    })
})