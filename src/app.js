const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()


//Define paths for Express config
const publicPathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


// Setup static directory
app.use(express.static(publicPathDirectory))


app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Manauwar Zulfekar Ansari'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
      title:'About Page',
      name:'Manauwar Zulfekar Ansari',
      email:'manauwar.zansari@gmail.com'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        message:'This is help page',
        title: 'Help',
        name: 'Manauwar Zulfekar Ansari'
    })
})

app.get('/weather',(req,res) =>{
    
    if(!req.query.address){
        return res.send({
            error:'You must provide address!'
        })
    }

    geocode(req.query.address,(error,data) =>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(data.latitude,data.longitude,(error,forecastData) =>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location:data.location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*',(req,res) =>{
    res.render('error',{
        message:'Help Article not found',
        name:'Manauwar Zulfekar Ansari'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        message: 'Page Not Found',
        name:'Manauwar Zulfekar Ansari'
    })
})

app.listen(3000,() =>{
    console.log('Sever is running on port 3000')
})

