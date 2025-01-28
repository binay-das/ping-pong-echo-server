import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [serverMessage, setServerMessage] = useState(null);
  const socketRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to server");
    };

    ws.onmessage = (ev) => {
      setServerMessage(ev.data);
      setTimeout(() => setServerMessage(null), 3000); // Clear message after 3 seconds
    };

    ws.onclose = () => {
      console.log("Connection to server closed");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (
      socketRef &&
      socketRef.current?.readyState === WebSocket.OPEN &&
      inputRef.current?.value
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
    <div className="w-screen h-screen flex bg-gray-100 text-gray-800">
      <div className="w-1/3 p-4 flex flex-col justify-center items-start bg-white shadow-md">
        <h1 className="text-3xl font-bold mb-4">Ping-Pong</h1>
        <h3 className="text-lg text-gray-500 mb-8">Echo Server</h3>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter message"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      <div className="w-2/3 flex flex-col justify-center items-center relative bg-gray-50 pl-20 mb-10">
        <div className="relative w-full h-full overflow-hidden flex flex-col justify-end">
          <AnimatePresence>
            {userMessages.map((msg, index) => (
              <motion.div
                key={index}
                className="text-gray-600 bg-gray-200 p-2 mb-2 rounded-md self-start min-w-1/3"
                initial={{ opacity: 0, y: 50 }} // Start below
                animate={{ opacity: 1, y: 0 }} // Move to position
                exit={{ opacity: 0, y: -50 }} // Move upward and fade out
                transition={{ duration: 0.5 }}
              >
                {msg}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div>
          <AnimatePresence>
            {serverMessage && (
              <motion.div
                className="absolute bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-8 rounded-full shadow-2xl"
                initial={{ scale: 50, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {serverMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
