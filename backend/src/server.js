import { config } from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Use authentication routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
