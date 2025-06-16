# 🏨 Hotel Booking App

A full-stack web application for hotel and room booking, built with the MERN stack. It offers a smooth experience for users, hotel owners, and admins, with secure authentication and online payment.

## ✨ Features

- ✅ User authentication system:
  - Email verification using OTP
  - Password reset via email
- 🏠 **Home Page**:
  - Displays featured destinations
  - Search functionality with recommended hotels based on location
- 🛏️ **Hotels Page**:
  - View all rooms
  - Filter by price or type
  - Sort by price (low to high / high to low) or newest
- 📋 **Room Details Page**:
  - Check-in / Check-out date form
  - Book if available, with feedback if not
- 💳 **Booking System**:
  - Secure booking with Stripe integration
  - Bookings are marked as Paid or Unpaid
- 📂 **My Bookings Page**:
  - Displays user's current and past bookings
- 🏨 **Hotel Owner Dashboard**:
  - Stats: Total Bookings & Total Revenue
  - Booking Table: Username / Room Type / Total Amount / Payment Status
  - Add Room page to create new rooms
  - Rooms List page for managing hotel rooms
- 📱 Fully responsive design for all devices

---

## 🛠️ Tech Stack

- **Frontend**:
  - React.js
  - Tailwind CSS
  - HTML, CSS, JavaScript

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)

- **Other**:
  - Stripe API (for payments)
  - JWT + OTP-based authentication system
