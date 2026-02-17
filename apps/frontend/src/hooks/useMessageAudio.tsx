import React from "react";

export default function useMessageAudio() {
  const messageSoundRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    messageSoundRef.current = new Audio("/audios/message-alert.mp3");
    messageSoundRef.current.preload = "auto";

    return () => {
      messageSoundRef.current = null;
    };
  }, []);

  const playMessageSound = async () => {
    if (messageSoundRef.current) {
      messageSoundRef.current.currentTime = 0;
      await messageSoundRef.current.play();
    }
  };

  return {
    playMessageSound,
  };
}
