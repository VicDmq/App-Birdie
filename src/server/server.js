import { Server } from "http";
import socket from "socket.io";
import {app} from "./app";
import { queryDatabase } from "./database";
import {
  formatResultAccordingToLimit,
  additionalLinesShouldBeGroupedTogether
} from "./resultFormatting";


const server = Server(app);
const io = socket(server);

io.sockets.on("connection", function(socket) {
  socket.on("Request", function(demographicDataType, limit) {
    const query =
      "SELECT " +
      demographicDataType +
      ", COUNT(*) AS count, AVG(age) AS avgAge FROM census_learn_sql GROUP BY " +
      demographicDataType +
      " ORDER BY COUNT(*) DESC";

    const callback = function(error, result) {
      if (error) {
        socket.emit("Error", error.message);
      } else {
        const shouldBeFormatted = additionalLinesShouldBeGroupedTogether(
          result.length,
          limit
        );
        const nbLinesNotDisplayed = shouldBeFormatted
          ? result.length - limit + 1
          : null;

        if (shouldBeFormatted) {
          result = formatResultAccordingToLimit(
            demographicDataType,
            result,
            limit
          );
        }

        socket.emit("Response", result, nbLinesNotDisplayed);
      }
    };

    queryDatabase(query, callback);
  });
});

module.exports = server;
