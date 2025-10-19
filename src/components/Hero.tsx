import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Sparkles, Star } from 'lucide-react';
import { CuteCharacter } from './CuteCharacter';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Cute Floating Elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 md:left-20 text-6xl"
      >
        ✨
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -10, 10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-10 md:right-20 text-5xl"
      >
        🌈
      </motion.div>

      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          rotate: [0, 15, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-40 left-10 md:left-32 text-6xl"
      >
        💻
      </motion.div>

      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          rotate: [0, -15, 0]
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-32 right-10 md:right-32 text-5xl"
      >
        🚀
      </motion.div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 left-1/4 text-4xl opacity-70"
      >
        ⭐
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-2/3 right-1/4 text-4xl opacity-70"
      >
        💡
      </motion.div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="flex flex-col items-center justify-center h-full px-6"
      >
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 max-w-5xl"
        >
          {/* Cute animated emoji badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
            className="inline-block mb-8"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-2xl opacity-50" />
              <div className="relative text-8xl drop-shadow-2xl">
                ✍️
              </div>
            </motion.div>
          </motion.div>

          <motion.h1 
            className="mb-6 text-5xl md:text-6xl lg:text-7xl tracking-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 12,
              delay: 0.3
            }}
          >
            <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              하루 15분,
            </span>
            <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2 drop-shadow-lg">
              내 손으로 프로그램 완성하기 ✨
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="inline-block px-8 py-4 backdrop-blur-xl bg-white/40 rounded-3xl border-2 border-white/60 shadow-2xl">
              <p className="text-xl md:text-2xl text-gray-700">
                비전공자도 가능한 <strong className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">손코딩 학습 서비스</strong> 💪
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full shadow-2xl text-xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                15분 무료 체험 시작하기
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🎯
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.9)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 backdrop-blur-xl bg-white/60 text-purple-600 border-2 border-purple-300 rounded-full text-xl hover:shadow-xl transition-all"
            >
              커리큘럼 보기 📚
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Cuter version */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10"
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-4xl mb-2"
            >
              👇
            </motion.div>
            <p className="text-sm text-gray-600 px-4 py-2 backdrop-blur-md bg-white/50 rounded-full border border-white/60">
              아래로 스크롤해보세요!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}