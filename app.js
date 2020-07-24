const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true , useUnifiedTopology: true});
const port = 80;


const contactSchema = new mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        address: String,
        concern: String
});

const Contact = mongoose.model('Contact', contactSchema);

//For serving Static files
app.use('/static', express.static('static'));
app.use(express.urlencoded())


//Set the Template engine as pug
app.set('view engine', 'pug');

//Set the Views Directory path of folder        //left side link and right side folder name
app.set('/views', path.join(__dirname, 'views'));

//our pug demo endpoint or path of pug file
app.get('/',  function(req, res) {
        const params = {};
        res.status(200).render('home.pug', params);
});

app.get('/contact',function(req, res){
        const params = {};
        res.status(200).render('contact.pug', params);
});
app.post('/contact', function(req, res){
        var myData = new Contact(req.body);
        myData.save().then(() => {
            res.send("Items was saved successfully");
            
        }).catch(() => {
                res.status(400).send("Item was not saved ");
        });
        // res.status(200).render('contact.pug', params);
});

app.listen(port, () => {
        console.log(`The application started successfully on port ${port}`);
})