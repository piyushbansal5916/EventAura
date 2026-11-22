const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, default: "Not provided" },
    email: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: String, required: true },
    guests: { type: String, default: "1" },
    eventDetails: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
