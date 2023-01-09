const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
require('./database')
const cookieParser = require('cookie-parser')

const errorHandler = require("./middleware/errorMiddleware")



const app = express()
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(errorHandler)

// EndPoint routers

const userRoute = require('./routes/userRoute')



app.use('/api/users', userRoute)


// Error Middleware

app.listen(port, () => {
    console.log("Server listening on port " + port)
})