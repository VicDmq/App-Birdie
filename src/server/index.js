import server from "./server";
import { appConfig } from "../../server.config";

const PORT = appConfig.server.port;
var server_host = process.env.HOST || "0.0.0.0";

server.listen(PORT, function() {
  console.log(
    "Server launched successfully : listening on " + PORT + " " + server_host
  );
});

//module.exports = { PORT };
