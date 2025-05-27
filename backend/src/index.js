require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const { logger, errLogger } = require("./middlewares/logger");
const corsOptions = require("./config/cors");
const connectDB = require("./config/DB_connect");
const PORT = process.env.PORT;

//////////*** middlewars start ****/////////

// app.use(logger);
app.use(cors(corsOptions));

app.use("/", express.urlencoded({ limit: "30mb", extended: false }));
app.use("/", express.json({ limit: "30mb" }));

app.use(cookieParser());

//////////*** middlewars end ****/////////
//////////*** routes start ****/////////

app.use("/api/auth", require("./routes/auth_routes"));
app.use("/api/users", require("./routes/user_routes"));
app.use("/api/notes", require("./routes/note_routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.use((req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });
}

//////////*** routes end ****/////////
//////////*** middlewars start ****/////////

// app.use(errLogger);

//////////*** middlewars end ****/////////

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
  connectDB();
});
