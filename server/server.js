import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app, server } from "./socketio/index.js";
import { authRoute, messageRoute, userRoute } from "./routes/!routesExports.js";
import connectToDb from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send(`Server is ready. Testing Nodemon`);
// });

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

server.listen(PORT, () => {
  connectToDb();
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
