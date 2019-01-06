import express from "express";
import { resolve } from "path";


const app = express();

app
  .use(express.static(resolve(__dirname, "../../build")))

  .get("/", function(request, response) {
    //Works only in production mode
    response.sendFile(index.html);
  })

  .use(function(request, response) {
    response.status(404);
    response.send("404 : Page not found");
  });

module.exports = { app };
