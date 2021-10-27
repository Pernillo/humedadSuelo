const { Server } = require("socket.io");

const createSocket = (httpServer) =>
  new Server(httpServer, {
    cors: {
      // origin: "*" /* "http://localhost:8080" */,
      methods: ["GET", "POST"],
      transports: ["websocket", "polling"],
      credentials: true,
    },
    allowEIO3: true,
  });

module.exports = { createSocket };
