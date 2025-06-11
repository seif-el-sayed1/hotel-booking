require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const userRouter = require('./routes/userRouter');
const ownerHotelRouter = require('./routes/ownerHotelRouter');
const bookingRouter = require('./routes/bookingRouter');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/ownerHotel", ownerHotelRouter);
app.use("/api/booking", bookingRouter);

app.get('/', (req, res) => {
    res.send("API is running");
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error.message));

module.exports = app;
