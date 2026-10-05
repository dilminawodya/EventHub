import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// =====================================================
// REGISTER USER
// =====================================================

export const registerUser = async (req, res) => {

    try {

        const {
            first_name,
            last_name,
            email,
            password
        } = req.body;


        // Check required fields

        if (
            !first_name ||
            !last_name ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }


        // Combine first name + last name

        const name = `${first_name.trim()} ${last_name.trim()}`;


        // Check existing email

        const [existingUser] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email.trim()]
        );


        if (existingUser.length > 0) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }


        // Hash password

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Insert user into MySQL

        const [result] = await db.query(
            `
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
            `,
            [
                name,
                email.trim(),
                hashedPassword
            ]
        );


        // Success response

        res.status(201).json({

            success: true,

            message: "User registered successfully",

            userId: result.insertId

        });


    } catch (error) {

        console.error(
            "REGISTER ERROR:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Registration failed"

        });

    }

};


// =====================================================
// LOGIN USER
// =====================================================

export const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Check fields

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: "Email and password are required"

            });

        }


        // Find user

        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email.trim()]
        );


        if (users.length === 0) {

            return res.status(401).json({

                success: false,

                message: "Invalid email or password"

            });

        }


        const user = users[0];


        // Compare password

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid email or password"

            });

        }


        // Create JWT

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        // Login success

        res.json({

            success: true,

            message: "Login successful",

            token,

            user: {

                id: user.id,

                name: user.name,

                email: user.email

            }

        });


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Login failed"

        });

    }

};