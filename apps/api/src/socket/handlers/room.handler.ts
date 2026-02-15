import type { Server, Socket } from "socket.io";

export default function registerRoomHandler(_io: Server, socket: Socket) {
  socket.on("join_user_room", async (userId: string) => {
    await socket.join(userId);
  });

  socket.on("leave_user_room", async (userId: string) => {
    await socket.leave(userId);
  });
}
