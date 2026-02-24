import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ai-code-reviewer-ochre.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/ai", aiRoutes);
export default app;
