import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import router from "./routes/router.js";

// Express setup
const app = express();
const PORT = 3000;

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");

// File and Folder Setup
if (!fs.existsSync("posts.json")) fs.writeFileSync("posts.json", "[]");
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route Handling

app.use('/',(router(upload)))

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
