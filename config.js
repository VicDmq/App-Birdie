const defaultPort = 8080;

const appConfig = {
  server: {
    poolConfig: {
      connectionLimit: 100,
      user: "test-read",
      password: "xnxPp6QfZbCYkY8",
      port: 3306,
      host: "birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com",
      database: "birdietest",
      connectionTimeout: 5000
    },
    port: process.env.PORT || defaultPort
  },
  socket: {
    url: process.env.NODE_ENV === "production" ? "/" : "http://localhost:" + defaultPort
  }
};

module.exports = { appConfig };
