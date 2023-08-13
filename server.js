const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { PORT, FRONT_END_URL1, FRONT_END_URL2 } = require("./config");
const connectDB = require("./config/connectDB");

const app = express();

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// Database configuration
connectDB();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// CORS
const corsOptions = {
  origin: ["https://quizmine-dashboard.vercel.app"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the quiz site application." });
});

// Routes
const mcqsRoutes = require("./routes/admin/mcqsRoutes");
const skillsRoutes = require("./routes/admin/skillsRoutes");
const testRoutes = require("./routes/test/testRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/mcqs", mcqsRoutes);
app.use("/api/v1/skills", skillsRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// Middleware for error handling
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

// Set port and listen for requests
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
