//import the associated models from index.js
const {Musician, Band, sequelize} = require('./index')

//test musician database CRUD
describe('Muscian Database', () => {

    beforeAll(async() => {
        //reset database
        await sequelize.sync({force:true})
        //create array of bands
        const arrayOfBands = [
            {name: 'Beatles', genre: 'pop', albums: 21},
            {name: 'Rolling Stones', genre: 'rock', albums: 30}
        ]
        //create array of musicians
        const arrayOfMusicians =[
            {name: 'Prince', instrument: 'all', albums: 39, isVocalist : true},
            {name: 'David Bowie', instrument: 'guitar', albums: 26, isVocalist : false},
            {name: 'Kasem', instrument: 'dhol', albums: 1, isVocalist : false},
            {name: 'John Lennon', instrument: 'guitar', albums:11, isVocalist: true},
            {name: 'Ringo Star', instrument: 'drums', albums:20, isVocalist: true}
        ]
        //add arrays to database
        await Band.bulkCreate(arrayOfBands)
        await Musician.bulkCreate(arrayOfMusicians)
    })

    //create instances of Musician Model for testin
    test('musicians have name', async() => {
        //read test instance from db
        const testMusician = await Musician.findOne({where: {name: 'Prince'}});
        expect(testMusician.name).toBe('Prince')
    })

    test('musicians have an instrument', async() => {
        //read test Musician instance from db
        const testMusician = await Musician.findOne({where: {name: 'Prince'}});
        expect(testMusician.instrument).toBe('all')
    })

    test('can create a band', async() => {
        //read test Band instance from db
        const testBand = await Band.findOne({where: {name: 'Beatles'}});
        expect(testBand.genre).toBe('pop')
    })

    test('bands can have many musicians', async()=> {
        //read test Band instance from db
        const testBand = await Band.findOne({where: {name: 'Beatles'}});
        //create 2 test instances of Musician
        const testMusician1 = await Musician.findOne({where: {name: 'John Lennon'}})
        const testMusician2 = await Musician.findOne({where: {name: 'Ringo Star'}})
        //add test musicians to test band
        //magic sequelize add method
        await testBand.addMusician(testMusician1)
        await testBand.addMusician(testMusician2)
        //retrieve list of musicians in this band
        const musicianList = await testBand.getMusicians()
        //assert that the list of musicians is length 2
        expect(musicianList.length).toBe(2)
        //assert that the 0th index of the array musicianList is an instance of the model Musician
        expect(musicianList[0] instanceof Musician).toBeTruthy()
        expect(musicianList[0].name).toMatch('John Lennon')

    })

})

