console.log("Web serverni boshlash!");
const htpp = require("http");
const express = require("express");
const app = express();
const path = require("path");
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// const db = require("./server").db();
// const mongodb = require("mongodb");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

// 1. Kirish codelari
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
// console.log("cookieParser:::::", cookieParser);

// 2. Session codelari
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, // for 30 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  // console.log(res.locals.member);
  next();
});
// 3. Views codelari
app.set("views", "views");
app.set("view engine", "ejs");

// 4. Routing map

// app.use("/resto", router_bssr);
app.use("/resto", router_bssr);
app.use("/", router);

const server = htpp.createServer(app);

/** Socket.io backend server */
const io = require("socket.io")(server, {
  serveClient: false,
  origins: "*:*",
  transport: ["websocket", "xhr-polling"],
});

let online_users = 0;

io.on("connection", function (socket) {
  online_users++;
  console.log("New user, total:", online_users);
  socket.emit("greetMsg", { text: "Welcome" });
  io.emit("infoMsg", { total: online_users });

  socket.on("disconnect", function () {
    online_users--;
    socket.broadcast.emit("infoMsg", { total: online_users });
    console.log("Client disconnected, total:", online_users);
  });

  socket.on("createMsg", function (data) {
    console.log("createMsg::", data);
    io.emit("newMsg", data);
  });

  // socket.emit(); => only new added user get first message
  // socket.broadcast.emit(); => beside of new added user other users get message
  // io.emit(); => all users
});

/** Socket.io backend server */

module.exports = server;
