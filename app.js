const express = require("express");
const app = express();
const path = require("path");

//Mongo DB call
const db = require("./server").db();
const mongodb = require("mongodb");

// 1. Kirish codelari
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Session codelari

// 3. Views codelari
app.set("views", "views");
app.set("view engine", "ejs");

// 4. Routing map

module.exports = app;
