const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000;

const app = express();

//Paths
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname, '../src/templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//Setup partials path
hbs.registerPartials(partialsPath)

//Setup static directory location
app.use(express.static(path.join(__dirname, '../Public')))

app.get('', (req, res) => {
    res.render("index", {
        title: 'Weather',
        name: 'Nathan Robinson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nathan Robinson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nathan Robinson',
        message: "Nobody panic!"
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.key){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.key)

    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: "You must have a query for address."})
    }   

    geocode(req.query.address, (error, {lattitude, longitude, location}={})=>{
        if(error){
            return res.send(error);
        }

        forecast(longitude, lattitude, (error, {weather_descriptions: weather, temperature, feelsLike, humidity}={})=>{
            if(error){
                return res.send({error: 'Unable to connect to weather service.'})
            }
            
            res.send({
                forecast: temperature,
                location: location,
                address: req.query.address,
                weather: weather,
                feelsLike: feelsLike,
                humidity: humidity
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        name: 'Nathan Robinson',
        title: 'Help Error Page',
        error: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Nathan Robinson',
        title: '404 Page',
        error: 'Page not found!'
    })
})

app.listen(port, ()=>{
    console.log('Server is running on ' + port)
})
