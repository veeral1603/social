import type { Socket, Server } from "socket.io";

interface TypingPayload {
  senderId: string;
  receiverId: string;
}

export default function registerTypingHandler(_io: Server, socket: Socket) {
  socket.on("start_typing", (payload: TypingPayload) => {
    socket.to(payload.receiverId).emit("user_started_typing");
  });

  socket.on("stop_typing", (payload: TypingPayload) => {
    socket.to(payload.receiverId).emit("user_stopped_typing");
  });
}
