import cors from "cors";
import express from "express";
import { API_URL, PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import crushRoutes from "./routes/crush.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/crushes", crushRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Crush Tracker API");
});

app.listen(PORT, async () => {
  console.log(`Server is running at ${API_URL}:${PORT}`);

  await connectToDatabase();
});
