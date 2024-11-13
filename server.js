const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("user message", (msg) => {
    console.log(msg);

    io.emit("user message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
