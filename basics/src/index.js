var express= require('express');
var path = require("path");
var https = require("https");
var fs = require("fs");

var app = express();

var privateKey = fs.readFileSync(__dirname + "/certs/key.pem").toString();
var certificate = fs.readFileSync(__dirname + "/certs/certificate.pem").toString();

app.use(express.static(path.join(__dirname, "public")));
app.get("*", function(req, res) {

   switch (req.path) {
      case "/text":
         res.sendFile(__dirname + "/public/text.html");
         break;
      default:
         res.sendFile(__dirname + "/public/index.html");
   }
});

var httpsServer = https.createServer({key: privateKey, cert: certificate}, app);
httpsServer.listen(3000);

module.exports = app;