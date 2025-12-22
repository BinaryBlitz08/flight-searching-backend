import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const TICKETS_DIR = path.join(process.cwd(), "tickets");

// Create tickets folder if not exists
if (!fs.existsSync(TICKETS_DIR)) {
  fs.mkdirSync(TICKETS_DIR);
}

const generateTicket = async (booking, flight, user) => {
  return new Promise((resolve, reject) => {
    try {
      // Create unique filename using PNR
      const fileName = `${booking.pnr}.pdf`;
      const filePath = path.join(TICKETS_DIR, fileName);

      // Create PDF document
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      doc.fontSize(28).font("Helvetica-Bold").text("FLIGHT TICKET", { align: "center" });
      doc.moveDown(0.5);
      doc.fontSize(16).font("Helvetica").text("Your journey awaits!", { align: "center" });
      doc.moveDown(2);

      doc.rect(50, doc.y, 495, 300).stroke();

      // Passenger Name
      doc.fontSize(18).font("Helvetica-Bold").text("Passenger Name:");
      doc.fontSize(16).font("Helvetica").text(user.name || user.email, { indent: 20 });
      doc.moveDown(1);

      // PNR
      doc.fontSize(18).font("Helvetica-Bold").text("PNR:");
      doc.fontSize(20).font("Helvetica-Bold").fillColor("#0066cc").text(booking.pnr, { indent: 20 });
      doc.fillColor("black");
      doc.moveDown(1);

      // Flight Details
      doc.fontSize(16).font("Helvetica-Bold").text("Flight Details:");
      doc.fontSize(14).font("Helvetica").text(`${flight.airline} - ${flight.flightNumber}`, { indent: 20 });
      doc.moveDown(0.5);

      // Route
      doc.fontSize(16).text(`${flight.departurePlace} → ${flight.arrivalPlace}`, { indent: 20 });
      doc.moveDown(1);

      // Date & Time
      const depDate = new Date(flight.departureTime).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const depTime = new Date(flight.departureTime).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });

      doc.fontSize(14).text(`Departure: ${depDate} at ${depTime}`, { indent: 20 });
      doc.moveDown(1.5);

      // Price
      doc.fontSize(18).font("Helvetica-Bold").text(`Amount Paid: ₹${booking.amountPaid}`);
      if (booking.amountPaid > flight.basePrice) {
        doc.fontSize(12).fillColor("red").text(" (Surge Price Applied +10%)", { indent: 20 });
        doc.fillColor("black");
      }
      doc.moveDown(2);

      // Booking Date
      const bookingDate = new Date(booking.bookingDate || booking.createdAt).toLocaleString("en-IN");
      doc.fontSize(12).text(`Booked on: ${bookingDate}`);

      // Footer
      doc.moveDown(4);
      doc.fontSize(12).text("Thank you for choosing us! Have a safe flight ✈️", { align: "center" });

      // Finalize PDF
      doc.end();

      stream.on("finish", () => {
        console.log(`PDF generated: ${fileName}`);
        // Return the public URL path
        resolve(`/tickets/${fileName}`);
      });

      stream.on("error", (err) => {
        console.error("PDF write error:", err);
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default generateTicket;