import { useEffect, useRef, useState } from "react";

function App() {
  const [message, setMessage] = useState("j");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socketRef.current = socket;
    socket.onopen = () => {
      console.log("Connected to server");
    };
    socket.onmessage = (ev) => {
      setMessage(ev.data);
    };
    socket.onclose = () => {
      console.log("Connection to server closed");
    };
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN &&
      inputRef.current?.value
    ) {
      socketRef.current.send(inputRef.current.value);
      inputRef.current.value = "";
    } else {
      alert("WebSocket is not connected or input is empty");
    }
  };
  return (
    <div className="flex flex-col justify-between bg-neutral-900 text-white w-screen h-screen">
      <div className="border border-white p-4">
        <div className="inline-flex flex-col text-right ml-4 ">
          <h1 className="font-bold text-2xl tracking-widest">Ping-Pong</h1>
          <h3 className="tracking-wide">Echo server</h3>
        </div>
      </div>
      <div>{message}</div>
      <div className="flex w-8/10 gap-2">
        <input
          ref={inputRef}
          type="text"
          name=""
          id=""
          placeholder="Enter message"
          className="bg-neutral-700 rounded-md p-2"
        />
        <button
          className="border px-4 py-2 rounded bg-neutral-100 text-black"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
