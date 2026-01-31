import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cookieParser from "cookie-parser";


dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);


app.get("/", (req, res) => {
    res.send("API działa");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server działa na porcie ${PORT}`);
});