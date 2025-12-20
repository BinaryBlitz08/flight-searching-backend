require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { seedFlights } = require("./services/flight.service");

const startServer = async () => {
  await connectDB();
  await seedFlights();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
