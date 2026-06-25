import express from "express";
import { pool } from "./database";
import cors from "cors";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🏨 Hotel Backend Running!");
});

/* ---------------- RESERVATION ---------------- */
app.post("/reservations", async (req, res) => {
    try {
        const { name, email, phone, check_in, check_out, room_type, guests } = req.body;

        await pool.query(
            `INSERT INTO reservations 
            (name, email, phone, check_in, check_out, room_type, guests)
            VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            [name, email, phone, check_in, check_out, room_type, guests]
        );

        res.status(201).json({ message: "Reservation created successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

/* ---------------- CONTACT ---------------- */
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        await pool.query(
            "INSERT INTO contact_messages (name, email, message) VALUES ($1,$2,$3)",
            [name, email, message]
        );

        res.status(201).json({ message: "Message sent successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});