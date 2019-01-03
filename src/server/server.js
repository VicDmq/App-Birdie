import express from "express";
import { Server } from "http";
import socket from "socket.io";
import { queryDatabase } from "./database";

const app = express();
const server = Server(app);
const io = socket(server);

io.sockets.on("connection", function(socket) {
  socket.on("Request", function(demographicDataType) {
    const query =
      "SELECT " +
      demographicDataType +
      ", COUNT(*) AS count, AVG(age) AS avgAge FROM census_learn_sql GROUP BY " +
      demographicDataType +
      " ORDER BY COUNT(*) DESC";

    const callback = function(error, results) {
      sendResponseWithSocketIO(socket, error, results);
    };

    queryDatabase(query, callback);
  });
});

function sendResponseWithSocketIO(socket, error, results) {
  if (error) {
    socket.emit("Error", error.message);
  } else {
    socket.emit("Response", results);
  }
}

module.exports = server;
