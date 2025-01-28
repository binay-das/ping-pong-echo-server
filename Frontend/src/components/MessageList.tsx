import { motion, AnimatePresence } from "framer-motion";

export const MessageList = ({ userMessages }: { userMessages: string[] }) => {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-end">
      <AnimatePresence>
        {userMessages.map((msg, index) => (
          <motion.div
            key={index}
            className="text-gray-600 bg-gray-200 p-2 mb-2 rounded-md self-start min-w-1/3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
