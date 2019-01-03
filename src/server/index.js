import server from "./server";
import {appConfig} from "../../server.config";

server.listen(appConfig.server.port, function() {
  console.log("Server launched successfully : listening on "+ appConfig.server.port);
});
