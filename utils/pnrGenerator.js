// utils/pnrGenerator.js

/**
 * Generates a unique 6-character PNR (Passenger Name Record)
 * Format: 3 Letters + 3 Numbers
 * Example: ABC123, XYZ789, KLM456
 */
const generatePNR = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let pnr = "";

  // Generate 3 random uppercase letters
  for (let i = 0; i < 3; i++) {
    const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    pnr += randomLetter;
  }

  // Generate 3 random numbers
  for (let i = 0; i < 3; i++) {
    const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
    pnr += randomNumber;
  }

  return pnr; // Example output: "XKY483"
};

// VERY IMPORTANT: This line exports the function so other files can use it
export default generatePNR;