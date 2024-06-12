const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute.js');
const jobRoute = require('./routes/jobRoute.js');
const verifyToken = require('./middleware/verifyToken.js')
const errorHandler = require('./middleware/errorHandler.js')

const PORT = 3000;
const app = express();
app.use(express.json())

app.use('/user',userRoute);
app.use('/job', verifyToken, jobRoute);

app.get('/health', (req,res)=>{
    //res.send  -  allows u to send a string
    //res.sendFile  - allows to send images and all
    //res.render  - send a file/template to render over the browser like ejs

    //res.json allows to send a json object
    res.json({
        message : 'Job Listing API is working fine',
        status : 'Working',
        date : new Date().toLocaleDateString()
    })
})

app.use("*", (req, res) => {
    res.status(404).json({
        message: 'Endpoint not found',
        status: 'Error',
    });
});
//route for invalid routes access

app.use(errorHandler);

app.listen(PORT, () => {
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`Server is running on PORT ${PORT}`))
    .catch((error) => { console.log('authentication failed : '+ error)})
   
})