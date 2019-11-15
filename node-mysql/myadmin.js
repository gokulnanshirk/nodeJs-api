var express = require("express");
var mysql = require("mysql");
var logger = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cors = require("cors");

var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});
connection.connect(error => {
  if (!!error) {
    console.log("error", error);
  } else {
    console.log("connected");
  }
});

app.get("/", (request, response) => {
  connection.query("select * from sample", (error, rows, fields) => {
    if (!!error) {
      console.log("error in query", error);
    } else {
      console.log("query success", rows, fields);
      response.json(rows);
    }
  });
});

app.get("/sp", (request, response) => {
  connection.query("CALL getSample()", (error, rows, fields) => {
    if (!!error) {
      console.log("error in query", error);
    } else {
      console.log("query success", rows, fields);
      response.json(rows);
    }
  });
});

app.listen(process.env.PORT || 8080);
