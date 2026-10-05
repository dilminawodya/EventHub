import db from "../config/db.js";

// Get all events
export const getEvents = async (req, res) => {
    try {
        const [events] = await db.query(
            "SELECT * FROM events ORDER BY id DESC"
        );

        res.json({
            success: true,
            events
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch events"
        });
    }
};


// Get single event
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const [events] = await db.query(
            "SELECT * FROM events WHERE id = ?",
            [id]
        );

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.json({
            success: true,
            event: events[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch event"
        });
    }
};


// Create event
export const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            event_date,
            event_time,
            location,
            price,
            image,
            category
        } = req.body;

        if (
            !title ||
            !event_date ||
            !event_time ||
            !location
        ) {
            return res.status(400).json({
                success: false,
                message: "Title, date, time and location are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO events
            (title, description, event_date, event_time, location, price, image, category)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                description,
                event_date,
                event_time,
                location,
                price || 0,
                image || null,
                category || null
            ]
        );

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            eventId: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create event"
        });
    }
};


// Update event
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            event_date,
            event_time,
            location,
            price,
            image,
            category
        } = req.body;

        const [result] = await db.query(
            `UPDATE events SET
            title = ?,
            description = ?,
            event_date = ?,
            event_time = ?,
            location = ?,
            price = ?,
            image = ?,
            category = ?
            WHERE id = ?`,
            [
                title,
                description,
                event_date,
                event_time,
                location,
                price,
                image,
                category,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.json({
            success: true,
            message: "Event updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update event"
        });
    }
};


// Delete event
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "DELETE FROM events WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete event"
        });
    }
};