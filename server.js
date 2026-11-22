const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Import models
const Booking = require("./models/Booking");
const Message = require("./models/Message");

const app = express();
const PORT = 3000;

// MongoDB Connection (SRV)
const MONGO_URI = "mongodb+srv://piyushbansal5916_db_user:qmAAUE95R5L2tSZQ@cluster0.fdjsyei.mongodb.net/eventaura?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
    family: 4,
    tlsAllowInvalidCertificates: true
})
    .then(() => console.log("✅ Connected to MongoDB Atlas successfully!"))
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// ==========================================
// CONTACT ROUTES
// ==========================================

// Receive contact form messages
app.post("/contact", async (req, res) => {
    try {
        const message = new Message({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        });

        await message.save();

        res.json({ success: true, message: "Message saved successfully!" });
    } catch (error) {
        console.error("Error saving message:", error.message);
        res.status(500).json({ success: false, message: "Failed to save message." });
    }
});

// Get all contact messages
app.get("/api/messages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ message: "Failed to fetch messages." });
    }
});

// Delete a contact message by ID
app.delete("/api/messages/:id", async (req, res) => {
    try {
        const result = await Message.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("Error deleting message:", error.message);
        res.status(500).json({ message: "Failed to delete message." });
    }
});

// ==========================================
// BOOKING ROUTES
// ==========================================

// Receive booking form data
app.post("/bookings", async (req, res) => {
    try {
        const booking = new Booking({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            eventType: req.body.eventType,
            eventDate: req.body.eventDate,
            guests: req.body.guests,
            eventDetails: req.body.eventDetails
        });

        await booking.save();

        console.log("New Booking Received:", booking);

        res.json({ success: true, message: "Booking saved successfully!" });
    } catch (error) {
        console.error("Error saving booking:", error.message);
        res.status(500).json({ success: false, message: "Failed to save booking." });
    }
});

// Get all bookings
app.get("/api/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error.message);
        res.status(500).json({ message: "Failed to fetch bookings." });
    }
});

// Delete a booking by ID
app.delete("/api/bookings/:id", async (req, res) => {
    try {
        const result = await Booking.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error.message);
        res.status(500).json({ message: "Failed to delete booking." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
