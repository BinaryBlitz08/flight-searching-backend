
### Backend README.md (Node.js + Express)

```markdown
# Flight Booking System - Backend

RESTful API for a full-featured flight booking system built with **Node.js**, **Express**, and **MongoDB Atlas**.

Live API: https://flight-booking-backend.onrender.com/api

## Features

- User registration & login with JWT authentication
- Password hashing with bcrypt
- Persistent **wallet system** (default ₹50,000)
- Flight search with date filtering and case-insensitive cities
- **Dynamic surge pricing** (+10% after 3 attempts in 5 minutes, resets after 10 minutes)
- Booking creation with PNR generation
- **PDF ticket generation** using pdfkit (includes final price & surge note)
- Booking history with populated flight details

## Tech Stack

- Node.js + Express
- MongoDB Atlas (Mongoose ODM)
- bcryptjs for password hashing
- jsonwebtoken for authentication
- pdfkit for PDF generation
- cors for frontend connectivity

## Setup & Run Locally

```bash
git clone https://github.com/BinaryBlitz08/flight-booking-backend.git
cd flight-booking-backend
npm install
