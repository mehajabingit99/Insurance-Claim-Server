//import all necessory dependencies
const express = require('express')
const { default: mongoose } = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

//configure DOT ENV
dotenv.config();
const app = express() //server created
app.use(express.json())//middleware
app.use(cors())//CROSS-ORIGIN 
app.use(allowCrossDomain)
app.options('*', cors())

//database connectivity
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected"))
.catch(err=>console.log("Error while connecting",err))

const PORT = process.env.PORT || 5000

const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
};

//routes for user api
app.use('/api/auth/user',require('./Routes/userRoutes'));

//routes for insurance claim api
app.use('/api/claim',require('./Routes/claimRoutes'))

//routes for insurance claim api
app.use('/api/issue',require('./Routes/issueRoutes'))

//server started
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})