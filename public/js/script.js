console.log("EventAura JavaScript Connected Successfully!");

// ==========================================
// Contact Form Submission
// ==========================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const messageData = {
            name: document.getElementById("contactName").value,
            email: document.getElementById("contactEmail").value,
            subject: document.getElementById("contactSubject").value,
            message: document.getElementById("contactMessage").value
        };

        try {
            const response = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(messageData)
            });

            const result = await response.json();

            if (result.success) {
                document.getElementById("contactResponse").textContent =
                    "Message sent successfully!";
                document.getElementById("contactResponse").style.color = "#2ecc71";

                contactForm.reset();
            } else {
                throw new Error("Submission failed");
            }

        } catch (error) {
            document.getElementById("contactResponse").textContent =
                "Something went wrong. Please try again.";
            document.getElementById("contactResponse").style.color = "#e74c3c";
        }
    });
}

// ==========================================
// Booking Form Submission
// ==========================================
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const booking = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone") ? document.getElementById("phone").value : "Not provided",
            email: document.getElementById("email").value,
            eventType: document.getElementById("event").value,
            eventDate: document.getElementById("date").value,
            guests: document.getElementById("tickets").value,
            eventDetails: document.getElementById("college")
                ? "College: " + document.getElementById("college").value
                : ""
        };

        try {
            const response = await fetch("/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking)
            });

            const result = await response.json();

            if (result.success) {
                document.getElementById("bookingMessage").textContent =
                    "Booking submitted successfully!";
                document.getElementById("bookingMessage").style.color = "#2ecc71";

                bookingForm.reset();
            } else {
                throw new Error("Booking failed");
            }

        } catch (error) {
            document.getElementById("bookingMessage").textContent =
                "Something went wrong. Please try again.";
            document.getElementById("bookingMessage").style.color = "#e74c3c";
        }
    });
}
