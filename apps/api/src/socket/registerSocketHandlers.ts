import type { Server, Socket } from "socket.io";
import registerRoomHandler from "./handlers/room.handler";
import registerMessageHandler from "./handlers/message.handler";

function registerSocketHandlers(io: Server, socket: Socket) {
  registerRoomHandler(io, socket);
  registerMessageHandler(io, socket);
}

export default registerSocketHandlers;
