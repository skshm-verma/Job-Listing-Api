const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute.js');
const jobRoute = require('./routes/jobRoute.js');
const errorHandler = require('./middleware/errorHandler.js')
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json())


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

app.use('/user',userRoute);
app.use('/job',jobRoute);

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
    console.clear();
    console.log(`Server is running on port ${PORT}`);
});

//another way to write and connect with MongoDb
// app.listen(PORT, () => {
//     mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log(`Server is running on PORT ${PORT}`))
//     .catch((error) => { console.log('authentication failed : '+ error)})
// })