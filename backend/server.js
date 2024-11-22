const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

const initRouter = require("./routers/router");

// The next 2 lines are to convert all api with body (http request body content) to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));
app.use(cookieParser());

const __dirname1 = path.resolve();
app.use("/uploads", express.static(path.join(__dirname1, "/uploads")));
// app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
// );

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/kltn");

// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product Not Found" });
//   }
// });

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Routes
initRouter(app);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//express-async-handler npm package (when expressAsyncHandler catch error will go to this middleware )
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Serve at http://localhost:5000");
});
