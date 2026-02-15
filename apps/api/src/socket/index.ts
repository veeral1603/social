import { Server } from "socket.io";
import type http from "http";
import registerSocketHandlers from "./registerSocketHandlers";

export function initSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: process.env["APP_URL"] || "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // console.log("Socket Connected");

    registerSocketHandlers(io, socket);

    socket.on("disconnect", () => {
      // console.log("Socket Disconnected");
    });
  });

  return io;
}
