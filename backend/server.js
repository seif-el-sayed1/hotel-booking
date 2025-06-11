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

const allowedOrigins = ["http://localhost:5173", 
        "https://hotel-booking-frontend-sage.vercel.app",
        "https://hotel-booking-frontend-git-main-seif-el-sayed1s-projects.vercel.app",
        "https://hotel-booking-frontend-jik9x75j1-seif-el-sayed1s-projects.vercel.app",
        "https://hotel-booking-frontend-kyocqzdp1-seif-el-sayed1s-projects.vercel.app"];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
