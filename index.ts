/*
 *  chat application entry point
 *  server configurations
 */

import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const port = 3002;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
let messages = [];
io.on("connection", (socket:any) => {
  io.emit("chat message", messages);
  socket.on("chat message", (msg:any) => {
    messages.push(msg);
    io.emit("chat message", messages);
  });
  socket.on("reset chat", () => {
    messages=[];
    io.emit("chat message", messages);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
