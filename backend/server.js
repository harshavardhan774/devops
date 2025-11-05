// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import path from "path";

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js"
// import userRoutes from "./routes/user.routes.js"

// import connectToMongoDB from "./db/connectToMongoDB.js";

// import { app,server } from "./socket/socket.js"; //updated at last when implenting socket

// dotenv.config();
// const port = process.env.port || 5000;

// const __dirname = path.resolve();

// app.use(express.json()); //to parse incomimg req. with json payloads. to get req.data
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req,res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
// });

// app.get("/", (req,res) => {
//     res.send("hello project starts");
// });

// server.listen(port, "0.0.0.0", () => {
//   connectToMongoDB();
//   console.log(`server is listening on port ${port}`);
// });



import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js"; // socket setup

// Load environment variables
dotenv.config();

// ✅ FIX: Correct variable name (must be uppercase)
const PORT = process.env.PORT || 5000;

// Get __dirname in ES module
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve frontend build (for production)
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Default route
app.get("/", (req, res) => {
  res.send("hello project starts");
});

// ✅ Connect DB first, then start server
connectToMongoDB()
  .then(() => {
    server.listen(PORT, "0.0.0.0", () => {
      console.log(` Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });

