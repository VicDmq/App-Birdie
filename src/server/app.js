import express from "express";
import { resolve } from "path";

const app = express();

if (process.env.NODE_ENV === "production") {
  app
    .use(express.static(resolve(__dirname, "../../build")))

    .get("/", function(request, response) {
      response.sendFile(index.html);
    })

    .use(function(request, response) {
      response.status(404);
      response.send("404 : Page not found");
    });
}

module.exports = { app };
