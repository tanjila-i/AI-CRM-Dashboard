import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";

const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
});
