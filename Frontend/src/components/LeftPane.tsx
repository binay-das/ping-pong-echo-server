export const LeftPane = ({
  sendMessage,
  inputRef,
}: {
  sendMessage: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  return (
    <div className="w-1/3 p-4 flex flex-col justify-center items-start bg-white shadow-md">
      <div className="flex flex-col text-right">
        <h1 className="text-3xl font-bold">Ping-Pong</h1>
        <h3 className="text-lg text-gray-500 mb-8">Echo Server</h3>
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter message"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
      />
      <p className="ml-2 italic opacity-55 text-xs">
        Try sending <span className="font-bold">'ping'</span>
      </p>
      <button
        onClick={sendMessage}
        className="px-4 py-2 my-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
      >
        Send
      </button>
    </div>
  );
};
