
import "dotenv/config";
import express from "express";
import { router } from "./routes";
import express, { type Request, type Response, type NextFunction } from "express";
import { router } from "./routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use("/api", router);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "GUTSY Backend" });
});

// GLOBAL ERROR HANDLER: Prevents the "Unexpected token A" error
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Critical Backend Error:", err.message);
  
  const status = err.status || 500;
  // We send JSON instead of letting the server crash into an HTML page
  res.status(status).json({ 
    success: false, 
    message: err.message || "Internal Server Error" 
  });
});

// Only start server when not in Vercel (for local development)
if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GUTSY Backend live on port ${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
