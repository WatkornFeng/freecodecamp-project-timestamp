// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api", (req, res) => {
  const date = new Date();
  const unix = date.getTime();

  return res.json({
    unix: unix,
    utc: date.toUTCString(),
  });
});
app.get("/api/:date", (req, res) => {
  let dateParams = req.params.date;

  //check if dateParams's not include non-number and it's not date string.
  const isUnix = /^\d+$/.test(dateParams);

  if (isUnix) {
    const convertToUnix = parseInt(dateParams);
    const date = new Date(convertToUnix);
    return res.json({
      unix: convertToUnix,
      utc: date.toUTCString(),
    });
  }

  const dateToUnix = Date.parse(dateParams);
  if (dateToUnix) {
    const date = new Date(dateToUnix);
    return res.json({
      unix: dateToUnix,
      utc: date.toUTCString(),
    });
  }
  return res.json({
    error: "Invalid Date",
  });
});
const PORT = process.env.PORT || 4040;
// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
