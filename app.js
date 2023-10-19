const express = require("express");
const app = express();
const path = require("path");
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");

//Mongo DB call
// const db = require("./server").db();
// const mongodb = require("mongodb");

// let session = require("express-session");
// const mongoDBStore = require("connect-mongodb-session")(session);
// const router_bssr = require("./router_bssr.js");
// const store = new mongoDBStore({
//   url: process.env.MONGO_URL,
//   collection: "sessions",
// });

// 1. Kirish codelari
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Session codelari
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     cookie: {
//       maxAge: 100 * 30 * 30,
//     },
//     store: store,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// 3. Views codelari
app.set("views", "views");
app.set("view engine", "ejs");

// 4. Routing map

// app.use("/resto", router_bssr);
app.use("/resto", router_bssr);
app.use("/", router);

module.exports = app;
