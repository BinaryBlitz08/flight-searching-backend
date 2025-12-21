const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateTicket = async (booking, flight, user) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();

      const dir = path.join(__dirname, "../tickets");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);

      const fileName = `${booking.pnr}.pdf`;
      const filePath = path.join(dir, fileName);

      doc.pipe(fs.createWriteStream(filePath));

      doc.fontSize(20).text("Flight Ticket", { align: "center" });
      doc.moveDown();

      doc.fontSize(14).text(`Passenger: ${user.name}`);
      doc.text(`Airline: ${flight.airline}`);
      doc.text(`Flight Number: ${flight.flightNumber}`);
      doc.text(`Route: ${flight.departurePlace} → ${flight.arrivalPlace}`);
      doc.text(`Departure: ${flight.departureTime}`);
      doc.text(`Arrival: ${flight.arrivalTime}`);
      doc.text(`Price Paid: ₹${booking.amountPaid}`);
      doc.text(`Booking Date: ${booking.bookingDate}`);
      doc.text(`PNR: ${booking.pnr}`);

      doc.end();

      resolve(filePath);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = generateTicket;
