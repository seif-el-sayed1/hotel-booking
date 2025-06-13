require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');
const ownerHotelRouter = require('./routes/ownerHotelRouter');
const bookingRouter = require('./routes/bookingRouter');
const connectCloudinary = require('./config/cloudinary');
const stripeWebhooks = require('./controllers/stripeWebhooks');
connectCloudinary()
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error.message));

const allowedOrigins = ["http://localhost:5173", "https://hotel-booking-frontend-sage.vercel.app"];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.post("/api/stripe", express.raw({type: 'application/json'}), stripeWebhooks);

app.use(express.json());

app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/ownerHotel", ownerHotelRouter);
app.use("/api/booking", bookingRouter);

app.get('/', (req, res) => {
    res.send("API is running");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
