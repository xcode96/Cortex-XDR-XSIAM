import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  const DB_PATH = path.join(__dirname, "queries.json");

  // Initialize DB if not exists
  if (!fs.existsSync(DB_PATH)) {
    // We'll populate this with the initial data from data.ts via a script later or manually
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }

  // API Routes
  app.get("/api/queries", (req, res) => {
    try {
      const data = fs.readFileSync(DB_PATH, "utf8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read queries" });
    }
  });

  app.post("/api/queries", (req, res) => {
    try {
      const queries = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
      const newQuery = {
        ...req.body,
        id: `q-${Date.now()}`,
        created: new Date().toISOString()
      };
      queries.push(newQuery);
      fs.writeFileSync(DB_PATH, JSON.stringify(queries, null, 2));
      res.status(201).json(newQuery);
    } catch (error) {
      res.status(500).json({ error: "Failed to save query" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
