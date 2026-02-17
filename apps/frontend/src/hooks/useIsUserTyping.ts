import React from "react";
import { socket } from "../lib/socket";
export default function useIsUserTyping() {
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    socket.on("user_started_typing", () => {
      setIsTyping(true);
    });
    socket.on("user_stopped_typing", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("user_started_typing");
      socket.off("user_stopped_typing");
    };
  }, [socket, setIsTyping]);

  return isTyping;
}
