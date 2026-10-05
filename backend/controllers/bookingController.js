import db from "../config/db.js";

// Create Booking
export const createBooking = async (req, res) => {
    try {

        const { event_id, quantity } = req.body;

const user_id = req.user.id;

        // Validate fields
        if (!user_id || !event_id || !quantity) {
            return res.status(400).json({
                success: false,
                message: "User, event and quantity are required"
            });
        }

        // Check quantity
        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            });
        }

        // Get event
        const [events] = await db.query(
            "SELECT * FROM events WHERE id = ?",
            [event_id]
        );

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        const event = events[0];

        // Calculate total price
        const total_price = Number(event.price) * Number(quantity);

        // Insert booking
        const [result] = await db.query(
            `INSERT INTO bookings 
            (user_id, event_id, quantity, total_price)
            VALUES (?, ?, ?, ?)`,
            [
                user_id,
                event_id,
                quantity,
                total_price
            ]
        );

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking: {
                id: result.insertId,
                user_id,
                event_id,
                quantity,
                total_price
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Booking failed"
        });

    }
};