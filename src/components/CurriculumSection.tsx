import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { BookOpen, Code, Rocket } from 'lucide-react';

const curriculum = [
  {
    weeks: "1~4주",
    topic: "파이썬 기초",
    result: "계산기 만들기",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600"
  },
  {
    weeks: "5~8주",
    topic: "데이터 다루기",
    result: "메모 앱 만들기",
    icon: Code,
    color: "from-purple-500 to-purple-600"
  },
  {
    weeks: "9~12주",
    topic: "프로젝트 완성",
    result: "미니 SNS 만들기",
    icon: Rocket,
    color: "from-pink-500 to-pink-600"
  }
];

export function CurriculumSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="py-32 px-6 bg-gradient-to-b from-purple-50 via-pink-50 to-white relative overflow-hidden">
      {/* Cute floating elements */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 20, 0],
          scale: [1, 1.4, 1]
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 right-10 text-7xl opacity-20"
      >
        📚
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, 20, 0],
          rotate: [0, -20, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 left-10 text-6xl opacity-20"
      >
        🎓
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="text-6xl mb-6"
          >
            📚
          </motion.div>
          <h2 className="mb-4 text-4xl md:text-5xl tracking-tight">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              한 권, 하나의 완성 프로젝트
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            하루 15분 × 12주 완성 ⏱️
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border-2 shadow-2xl backdrop-blur-xl bg-white/90">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center text-lg">주차</div>
                <div className="text-center text-lg">학습 주제</div>
                <div className="text-center text-lg">완성 결과물</div>
              </div>
            </div>
            
            {curriculum.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                  whileHover={{ 
                    backgroundColor: "rgba(249, 250, 251, 1)",
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className={`grid grid-cols-3 gap-4 p-8 ${
                    index < curriculum.length - 1 ? 'border-b-2' : ''
                  } transition-all cursor-pointer`}
                >
                  <div className="text-center flex items-center justify-center">
                    <motion.div 
                      className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={24} />
                      <span>{item.weeks}</span>
                    </motion.div>
                  </div>
                  <div className="text-center flex items-center justify-center text-gray-700 text-lg">
                    {item.topic}
                  </div>
                  <div className="text-center flex items-center justify-center">
                    <motion.span 
                      className="px-5 py-3 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl border-2 border-yellow-300 text-gray-800 shadow-md"
                      whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
                    >
                      {item.result}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border-2 border-purple-300 inline-block shadow-xl">
              <p className="text-2xl text-gray-700 mb-2">
                <strong className="text-blue-600">한 권의 교재</strong> = <strong className="text-purple-600">하나의 프로젝트</strong> ✨
              </p>
              <p className="text-gray-600">
                체계적인 학습으로 실전 프로젝트까지 완성합니다 🚀
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}