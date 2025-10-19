import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function CallToAction() {
  return (
    <div className="py-32 px-6 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 relative overflow-hidden">
      {/* Animated cute elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 left-10 text-7xl"
      >
        ✨
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -15, 15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 text-6xl"
      >
        🌟
      </motion.div>

      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          rotate: [0, 20, 0]
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-20 text-7xl"
      >
        🚀
      </motion.div>

      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          rotate: [0, -20, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 right-20 text-6xl"
      >
        💫
      </motion.div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl"
            >
              ✍️
            </motion.div>
          </motion.div>

          <h2 className="mb-8 text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight drop-shadow-lg">
            오늘 15분, 내일 실행 결과. ⏰
          </h2>
          
          <div className="mb-6 backdrop-blur-xl bg-white/20 rounded-3xl p-6 border-2 border-white/40 shadow-2xl inline-block">
            <p className="text-2xl md:text-3xl text-white mb-2">
              손으로 쓴 한 줄 코드가 ✨
            </p>
            <p className="text-2xl md:text-3xl text-white">
              당신의 첫 프로그램이 됩니다. 🚀
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <motion.button
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 25px 70px rgba(0,0,0,0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group px-12 py-6 bg-white text-purple-600 rounded-full shadow-2xl text-xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  🎯
                </motion.span>
                15분 무료 체험 시작하기
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}