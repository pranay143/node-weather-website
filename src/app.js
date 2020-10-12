const path = require('path')
const express = require('express');
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const getForecastData = require('./utils/forecast')

const app = express();

//Define paths for express config
const directory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and setup location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static dractory to serve view
 app.use(express.static(directory))

 app.get('', (req, res) => {
     res.render('index', {
         title: 'Weather App',
         name: 'Pranay'
     })
 })

 app.get('/about', (req, res) => {
     res.render('about', {
         title: 'About Me'
     })
 })

 app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help on the way'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.state
    if(!address) {
        return res.send({
            error:  'You must provide location'
        })
    } 
        
        geoCode(address, (error, {latitude, longitude, location} = {}) => {
       
            if(error) {
               return res.send({error})
            }
    
            //calling forecast callback
            getForecastData(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                } 
                res.send({
                    location: location,
                    forecastData: forecastData

                })
                //res.send(forecastData)
                
            }) 
        })
    
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(7000, () => {
    console.log('Server connected')
})