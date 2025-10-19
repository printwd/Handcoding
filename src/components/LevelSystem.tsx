import { motion } from 'motion/react';
import { LevelBadge } from './LevelBadge';

export function LevelSystem() {
  const levels = [
    { level: 1, title: "코딩 새싹", emoji: "🌱", color: "bg-gradient-to-br from-green-300 to-green-400" },
    { level: 2, title: "코딩 친구", emoji: "😊", color: "bg-gradient-to-br from-blue-300 to-blue-400" },
    { level: 3, title: "코딩 달인", emoji: "🎯", color: "bg-gradient-to-br from-purple-300 to-purple-400" },
    { level: 4, title: "코딩 마스터", emoji: "⭐", color: "bg-gradient-to-br from-yellow-300 to-yellow-400" },
    { level: 5, title: "코딩 천재", emoji: "👑", color: "bg-gradient-to-br from-pink-300 to-pink-400" },
  ];

  return (
    <div className="py-32 px-6 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 text-9xl opacity-5"
      >
        🎮
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 text-4xl md:text-5xl tracking-tight"
        >
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            레벨업 시스템 🎮
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16 text-xl text-gray-600"
        >
          코딩을 배우면서 레벨업 해보세요!
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {levels.map((level, index) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <LevelBadge {...level} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 shadow-lg">
            <p className="text-xl text-gray-700 mb-4">
              <span className="text-3xl mr-2">💪</span>
              매일 조금씩 배우면 누구나 천재가 될 수 있어요!
            </p>
            <motion.div
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-4xl"
            >
              🚀
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
