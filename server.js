const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("🔌 conectado:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log("📥 join:", socket.id, roomId);
  });

  socket.on("signal", (data) => {
    io.to(data.roomId).emit("signal", data);
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("🚀 server running");
});