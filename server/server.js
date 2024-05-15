import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectToDb from "./db/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Server is ready. Testing Nodemon`);
});

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
