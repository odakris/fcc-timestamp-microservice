// init project
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint
app.get("/:key?", (req, res, next) => {
  let key = req.params.key;

  key === "api" 
    ? next() 
    : res.json({
      "error 404": "please use correct route => [url]/api"
    })
});

app.get("/api/:date?", (req, res) => {
  let inputDate = req.params.date;
  let utcDate;
  let isNumRegex = /^[0-9]+$/;
  console.log(req.software);

  if (!inputDate) {
    // if not input date, get current date
    utcDate = new Date();
  } else {
    isNumRegex.test(inputDate)
      ? // if input date is numerical (unix format)
      (utcDate = new Date(parseInt(inputDate)))
      : // else input date is date format
      (utcDate = new Date(inputDate));
  }

  // check for valid date or not
  utcDate.toUTCString() === "Invalid Date"
    ? res.json({ error: utcDate.toUTCString() })
    : res.json({ unix: utcDate.getTime(), utc: utcDate.toUTCString() });
});



// listen for requests
const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
