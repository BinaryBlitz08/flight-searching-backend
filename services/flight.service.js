const Flight = require("../models/Flight");

const seedFlights = async () => {
  const count = await Flight.countDocuments();
  if (count > 0) {
    console.log("Flights already seeded");
    return;
  }

  const flights = 
    [
  {
    flightNumber: "AI101",
    airline: "Air India",
    departurePlace: "Delhi",
    arrivalPlace: "Mumbai",
    departureTime: new Date("2025-01-10T08:00:00"),
    arrivalTime: new Date("2025-01-10T10:00:00"),
    basePrice: 2500
  },
  {
    flightNumber: "IN202",
    airline: "IndiGo",
    departurePlace: "Delhi",
    arrivalPlace: "Bangalore",
    departureTime: new Date("2025-01-10T09:00:00"),
    arrivalTime: new Date("2025-01-10T11:30:00"),
    basePrice: 2600
  },
  {
    flightNumber: "VT303",
    airline: "Vistara",
    departurePlace: "Mumbai",
    arrivalPlace: "Delhi",
    departureTime: new Date("2025-01-11T15:00:00"),
    arrivalTime: new Date("2025-01-11T17:00:00"),
    basePrice: 2700
  },
  {
    flightNumber: "SG404",
    airline: "SpiceJet",
    departurePlace: "Mumbai",
    arrivalPlace: "Chennai",
    departureTime: new Date("2025-01-12T06:00:00"),
    arrivalTime: new Date("2025-01-12T08:00:00"),
    basePrice: 2400
  },
  {
    flightNumber: "AK505",
    airline: "Akasa Air",
    departurePlace: "Delhi",
    arrivalPlace: "Pune",
    departureTime: new Date("2025-01-13T18:00:00"),
    arrivalTime: new Date("2025-01-13T20:00:00"),
    basePrice: 2300
  },
  {
    flightNumber: "AI606",
    airline: "Air India",
    departurePlace: "Bangalore",
    arrivalPlace: "Hyderabad",
    departureTime: new Date("2025-01-14T07:00:00"),
    arrivalTime: new Date("2025-01-14T08:15:00"),
    basePrice: 2100
  },
  {
    flightNumber: "IN707",
    airline: "IndiGo",
    departurePlace: "Chennai",
    arrivalPlace: "Kolkata",
    departureTime: new Date("2025-01-14T10:00:00"),
    arrivalTime: new Date("2025-01-14T12:30:00"),
    basePrice: 2800
  },
  {
    flightNumber: "VT808",
    airline: "Vistara",
    departurePlace: "Delhi",
    arrivalPlace: "Kolkata",
    departureTime: new Date("2025-01-15T13:00:00"),
    arrivalTime: new Date("2025-01-15T15:00:00"),
    basePrice: 3000
  },
  {
    flightNumber: "SG909",
    airline: "SpiceJet",
    departurePlace: "Jaipur",
    arrivalPlace: "Mumbai",
    departureTime: new Date("2025-01-16T16:00:00"),
    arrivalTime: new Date("2025-01-16T18:00:00"),
    basePrice: 2200
  },
  {
    flightNumber: "AK010",
    airline: "Akasa Air",
    departurePlace: "Ahmedabad",
    arrivalPlace: "Delhi",
    departureTime: new Date("2025-01-17T09:30:00"),
    arrivalTime: new Date("2025-01-17T11:00:00"),
    basePrice: 2000
  },
  {
    flightNumber: "AI111",
    airline: "Air India",
    departurePlace: "Mumbai",
    arrivalPlace: "Goa",
    departureTime: new Date("2025-01-18T12:00:00"),
    arrivalTime: new Date("2025-01-18T13:15:00"),
    basePrice: 2600
  },
  {
    flightNumber: "IN212",
    airline: "IndiGo",
    departurePlace: "Delhi",
    arrivalPlace: "Chandigarh",
    departureTime: new Date("2025-01-18T17:00:00"),
    arrivalTime: new Date("2025-01-18T18:00:00"),
    basePrice: 1800
  },
  {
    flightNumber: "VT313",
    airline: "Vistara",
    departurePlace: "Bangalore",
    arrivalPlace: "Mumbai",
    departureTime: new Date("2025-01-19T06:30:00"),
    arrivalTime: new Date("2025-01-19T08:15:00"),
    basePrice: 2900
  },
  {
    flightNumber: "SG414",
    airline: "SpiceJet",
    departurePlace: "Lucknow",
    arrivalPlace: "Delhi",
    departureTime: new Date("2025-01-19T20:00:00"),
    arrivalTime: new Date("2025-01-19T21:15:00"),
    basePrice: 1900
  },
  {
    flightNumber: "AK515",
    airline: "Akasa Air",
    departurePlace: "Hyderabad",
    arrivalPlace: "Pune",
    departureTime: new Date("2025-01-20T14:00:00"),
    arrivalTime: new Date("2025-01-20T15:30:00"),
    basePrice: 2200
  },
  {
  flightNumber: "AI616",
  airline: "Air India",
  departurePlace: "Delhi",
  arrivalPlace: "Jaipur",
  departureTime: new Date("2025-01-21T07:00:00"),
  arrivalTime: new Date("2025-01-21T08:00:00"),
  basePrice: 1900
},
{
  flightNumber: "IN727",
  airline: "IndiGo",
  departurePlace: "Mumbai",
  arrivalPlace: "Ahmedabad",
  departureTime: new Date("2025-01-21T09:30:00"),
  arrivalTime: new Date("2025-01-21T10:45:00"),
  basePrice: 2100
},
{
  flightNumber: "VT838",
  airline: "Vistara",
  departurePlace: "Delhi",
  arrivalPlace: "Goa",
  departureTime: new Date("2025-01-22T11:00:00"),
  arrivalTime: new Date("2025-01-22T13:30:00"),
  basePrice: 3200
},
{
  flightNumber: "SG949",
  airline: "SpiceJet",
  departurePlace: "Kolkata",
  arrivalPlace: "Patna",
  departureTime: new Date("2025-01-22T14:00:00"),
  arrivalTime: new Date("2025-01-22T15:00:00"),
  basePrice: 1700
},
{
  flightNumber: "AK525",
  airline: "Akasa Air",
  departurePlace: "Bangalore",
  arrivalPlace: "Chennai",
  departureTime: new Date("2025-01-23T06:00:00"),
  arrivalTime: new Date("2025-01-23T07:15:00"),
  basePrice: 2000
},
{
  flightNumber: "AI626",
  airline: "Air India",
  departurePlace: "Pune",
  arrivalPlace: "Delhi",
  departureTime: new Date("2025-01-23T16:00:00"),
  arrivalTime: new Date("2025-01-23T18:00:00"),
  basePrice: 2800
},
{
  flightNumber: "IN737",
  airline: "IndiGo",
  departurePlace: "Hyderabad",
  arrivalPlace: "Kolkata",
  departureTime: new Date("2025-01-24T08:00:00"),
  arrivalTime: new Date("2025-01-24T10:30:00"),
  basePrice: 3000
},
{
  flightNumber: "VT848",
  airline: "Vistara",
  departurePlace: "Mumbai",
  arrivalPlace: "Bangalore",
  departureTime: new Date("2025-01-24T19:00:00"),
  arrivalTime: new Date("2025-01-24T20:45:00"),
  basePrice: 2900
},
{
  flightNumber: "SG959",
  airline: "SpiceJet",
  departurePlace: "Delhi",
  arrivalPlace: "Amritsar",
  departureTime: new Date("2025-01-25T12:00:00"),
  arrivalTime: new Date("2025-01-25T13:15:00"),
  basePrice: 1800
},
{
  flightNumber: "AK535",
  airline: "Akasa Air",
  departurePlace: "Nagpur",
  arrivalPlace: "Mumbai",
  departureTime: new Date("2025-01-25T17:00:00"),
  arrivalTime: new Date("2025-01-25T18:30:00"),
  basePrice: 2100
}

];

  await Flight.insertMany(flights);
  console.log("Flights seeded successfully");
};

const searchFlights = async (from, to) => {
  return await Flight.find({
    departurePlace: from,
    arrivalPlace: to
  }).limit(10);
};

module.exports = { seedFlights, searchFlights };
