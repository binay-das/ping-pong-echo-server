import { motion, AnimatePresence } from "framer-motion";

export const ServerMessage = ({
  serverMessage,
}: {
  serverMessage: string | null;
}) => {
  return (
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
  );
};
