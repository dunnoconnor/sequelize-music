//use express and path modules
const express = require('express')
const path = require('path')
//require models and associations
const {Musician, Band} = require('./index')

//configure express app
const app = express()
const port = 3000

//allow express to read json request bodies
app.use(express.json())

//return all musicians
app.get('/musicians', async (req,res) => {
    //find all instances of Musician model
    const allMusicians = await Musician.findAll()
    //respond with allMusicians as an array of json objects
    res.json(allMusicians)
})

//returns result of a search
app.get('/search', async (req,res) => {
    //create empty array of musicians
    let results = []
    //if they query a name, return all musicians with that name
    if (req.query.name){
        results = await Musician.findAll({where:{name: req.query.name}})
    }
    //if they query an instrument, return all musicians with that instrument
    else if (req.query.instrument){
        results = await Musician.findAll({where:{instrument: req.query.instrument}})
    }
    //respond with results as an array of json objects
    res.json(results)
})

//return all bands
app.get('/bands', async (req,res) => {
    //find all instances of Band model
    const allBands = await Band.findAll()
    //respond with allBands as an array of json objects
    res.json(allBands)
})


//create new band
app.post('/bands', async (req,res) =>{
    let newBand = await Band.create(req.body)
    res.send("Band Created")
})

//update one band by id
app.put('/bands/:id', async (req,res) => {
    let updatedBand = await Band.update(req.body, {
        where : {id:req.params.id}
    })
    res.send(updatedBand ? "Band Updated" : "Update Failed")
})

//delete one band by id
app.delete('/bands/:id', async (req,res) => {
    const deleted = await Band.destroy({
        where: {id: req.params.id}
    })
    //use boolen return value from destroy method return to generate a string message
    res.send(deleted ? "Deleted Band" : "Deletion Failed")
})

//return all musicians in a band
app.get('/bandmembers/:id', async (req,res) => {
    let results =[]
    //find the band with this id
    const thisBand = await Band.findByPk(req.params.id)
    results.push(thisBand)
    //find all Musicians in the band of this id
    const musiciansInThisBand = await Musician.findAll({where: {BandId: req.params.id}})
    results.push(musiciansInThisBand)
    //respond with musicians as an array of json objects
    res.json(results)
})

//return one musician by id
app.get('/musicians/:id', async (req,res) => {
    //find one specific instance of the Musician model by id
    const thisMusician = await Musician.findByPk(req.params.id)
    //respond with allMusicians as an array of json objects
    res.json(thisMusician)
})

//create one musician
app.post('/musicians', async (req,res) => {
    //create a musician using the json object passed in the request body
    let newMusician = await Musician.create(req.body)
    //send a response string
    res.send(newMusician ? 'Musician created': 'post failed')
})

//update one musician by id
app.put('/musicians/:id', async (req,res) => {
    let updatedMusician = await Musician.update(req.body, {
        where: {id: req.params.id}
    })
    res.send("Updated!")
})

//delete one musician by id
app.delete('/musicians/:id', async (req,res) =>{
    //destroy the musician matching the request parameter id
    await Musician.destroy({
        where: {id: req.params.id}
    })
    //send string message as response
    res.send("Deleted Musician")
})

// return one musician by name
app.get('/musician-name/:name', async(req,res)=>{
    //find one specific instance of the Musician model by name
    const thisMusician = await Musician.findOne({where:{name: req.params.name}})
    res.json(thisMusician)
})

//return one band by id
app.get('/bands/:id', async (req,res) => {
    //find one specific instance of the Band model
    const thisBand = await Band.findByPk(req.params.id)
    //respond with allBands as an array of json objects
    res.json(thisBand)
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})