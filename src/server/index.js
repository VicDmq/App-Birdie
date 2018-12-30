import server from "./server";

var PORT = 8080;

server.listen(PORT, function() {
  console.log(`Server launched successfully : listening on ${PORT}`);
});
