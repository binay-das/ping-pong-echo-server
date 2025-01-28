import { useEffect, useRef, useState } from "react";
import { MainLayout } from "./components/MainLayout";

function App() {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    socketRef.current = ws;

    ws.onopen = () => console.log("Connected to server");

    ws.onmessage = (ev) => {
      setServerMessage(ev.data);
      setTimeout(() => setServerMessage(null), 3000);
    };

    ws.onclose = () => console.log("Connection to server closed");

    ws.onerror = (err) => console.error("WebSocket error:", err);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (
      socketRef.current?.readyState === WebSocket.OPEN &&
      inputRef.current?.value.trim()
    ) {
      const userMessage = inputRef.current.value;
      setUserMessages((prev) => [...prev, userMessage]);
      socketRef.current.send(userMessage);
      inputRef.current.value = "";
    } else {
      alert("WebSocket is not connected or input is empty");
    }
  };

  return (
    <MainLayout
      sendMessage={sendMessage}
      inputRef={inputRef}
      userMessages={userMessages}
      serverMessage={serverMessage}
    />
  );
}

export default App;
