const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000


// Paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const staticPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static directory to serve
app.use(express.static(staticPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alex'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Alex'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Alex',
        message: 'Help yourself'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error})
    }

    geocode(req.query.address, (error, {lon, lat, loc}={}) => {
        if(error) {
            return res.send({error})
        }

        forecast({lat, lon}, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                address: req.query.address,
                location: loc,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.kuh) {
        return res.send({
            error: 'You must provide kuh'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'No help',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

