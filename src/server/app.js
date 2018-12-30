var express =require("express");

var app = express();

//app.use(express.static(resolve(__dirname, "../client/app")))

app.get("/", function(request, response) {
  response.writeHead(200);
  response.send("Bonjour !");
  response.end();
})

.use(function(request, response) {
  response.writeHead(404);
  response.send("Désolé la page n'existe pas !");
  response.end();
});

module.exports = app;
