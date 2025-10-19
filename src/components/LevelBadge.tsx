import { motion } from 'motion/react';

interface LevelBadgeProps {
  level: number;
  title: string;
  emoji: string;
  color: string;
}

export function LevelBadge({ level, title, emoji, color }: LevelBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.15,
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.5 }
      }}
      className={`${color} rounded-full p-6 shadow-xl border-4 border-white cursor-pointer text-center`}
    >
      <div className="text-5xl mb-2">{emoji}</div>
      <div className="text-sm mb-1">레벨 {level}</div>
      <div className="text-xs opacity-80">{title}</div>
    </motion.div>
  );
}
