const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for OTPs
// Format: { "+919876543210": { otp: "123456", expiresAt: 1690000000000 } }
const otpStore = new Map();

app.post("/api/auth/send-otp", (req, res) => {
  const { name, mobile, email } = req.body;

  if (!mobile || !name || !email) {
    return res.status(400).json({ error: "Name, mobile, and email are required" });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Expiry time (5 minutes from now)
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore.set(mobile, { otp, expiresAt });

  // Simulate sending SMS
  console.log(`\n=========================================`);
  console.log(`📱 SMS TO: ${mobile}`);
  console.log(`🔑 OTP: ${otp}`);
  console.log(`=========================================\n`);

  res.json({ success: true, message: "OTP sent successfully" });
});

app.post("/api/auth/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ error: "Mobile number and OTP are required" });
  }

  const record = otpStore.get(mobile);

  if (!record) {
    return res.status(400).json({ error: "No OTP found for this mobile number or it has expired" });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobile);
    return res.status(400).json({ error: "OTP has expired. Please request a new one." });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  // OTP is valid
  otpStore.delete(mobile); // Clear it so it can't be reused
  
  res.json({ success: true, message: "OTP verified successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Authentication Backend running on http://localhost:${PORT}`);
});
