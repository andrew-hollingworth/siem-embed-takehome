import express from "express";
import os from "os";
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/os-info", (req, res) => {
  res.json({
    cpus: os.cpus(),
    loadavg: os.loadavg(),
    cpulength: os.cpus().length,
    arch: os.arch(),
    platform: os.platform(),
    hostname: os.hostname(),
    freeMem: os.freemem(),
    totalMem: os.totalmem(),
  });
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
