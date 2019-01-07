import server from "./server";
import { appConfig } from "../../config";

const port = appConfig.server.port;

server.listen(port, function() {
  console.log("Server launched successfully : listening on " + port);
});
