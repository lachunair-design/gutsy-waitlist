import express from "express";
import { router } from "./routes.js"; // Explicit .js extension

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use("/api", router);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "GUTSY Backend" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
