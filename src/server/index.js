import server from "./server";
import { appConfig } from "../../server.config";

const PORT = process.env.PORT || appConfig.server.port;

server.listen(PORT, function() {
  console.log("Server launched successfully : listening on " + PORT);
});
