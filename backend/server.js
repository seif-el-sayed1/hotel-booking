require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/userRouter')
const ownerHotelRouter = require('./routes/ownerHotelRouter') 
const bookingRouter = require('./routes/bookingRouter')

app.use(express.json())
const allowedOrigins = ["http://localhost:5173"] 
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(cookieParser())

app.use("/api/user", userRouter)
app.use("/api/ownerHotel", ownerHotelRouter)
app.use("/api/booking", bookingRouter)


app.get('/', (req, res) => {
    res.send("API is running")
})

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log(error.message))

app.listen(process.env.PORT || 3000, () => console.log("Server running on port 5000"))