import { motion } from 'motion/react';

interface CuteCharacterProps {
  emoji: string;
  color: string;
  delay?: number;
}

export function CuteCharacter({ emoji, color, delay = 0 }: CuteCharacterProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay
      }}
      whileHover={{ 
        scale: 1.2, 
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 }
      }}
      className={`inline-flex items-center justify-center w-20 h-20 ${color} rounded-full shadow-lg cursor-pointer`}
    >
      <span className="text-4xl">{emoji}</span>
    </motion.div>
  );
}
