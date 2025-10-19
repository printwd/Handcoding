import { motion } from 'motion/react';

const emojis = ['🎮', '🎨', '🎯', '🏆', '🌈', '⚡', '🎪', '🎭'];

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {emojis.map((emoji, index) => {
        const randomDelay = Math.random() * 3;
        const randomDuration = 20 + Math.random() * 15;
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        return (
          <motion.div
            key={index}
            initial={{ 
              x: `${randomX}vw`, 
              y: `${randomY}vh`,
              opacity: 0.15,
              scale: 0.8
            }}
            animate={{
              y: [`${randomY}vh`, `${randomY - 40}vh`, `${randomY}vh`],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
              ease: "easeInOut"
            }}
            className="absolute text-5xl"
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
