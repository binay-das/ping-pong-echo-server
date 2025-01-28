import { LeftPane } from "./LeftPane";
import { MessageList } from "./MessageList";
import { ServerMessage } from "./ServerMessage";

export const MainLayout = ({
  sendMessage,
  inputRef,
  userMessages,
  serverMessage,
}: {
  sendMessage: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  userMessages: string[];
  serverMessage: string | null;
}) => {
  return (
    <div className="w-screen h-screen flex bg-gray-100 text-gray-800">
      <LeftPane sendMessage={sendMessage} inputRef={inputRef} />
      <div className="w-2/3 flex flex-col justify-center items-center relative bg-gray-50 pl-20 mb-10">
        <MessageList userMessages={userMessages} />
        <ServerMessage serverMessage={serverMessage} />
      </div>
    </div>
  );
};
