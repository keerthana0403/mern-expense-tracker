import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config(); // to access env

const app = express(); // express server created
const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   // root route : http//localhost:5000/
//   res.send("Hello world!");
// }); // test route

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes); // routes
app.use("/api/expense-record", expenseRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
