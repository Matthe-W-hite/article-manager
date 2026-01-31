import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Użytkownik już istnieje" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Utworzono użytkownika", user });
    }   catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Nieprawidłowe dane logowania"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Nieprawidłowe dane logowania" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // HTTPS -> true
            sameSite: "lax", // produkcja: "none"
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Zalogowano" });
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Wylogowano" });
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
