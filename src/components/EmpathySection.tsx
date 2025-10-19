import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { X, CheckCircle } from 'lucide-react';

const problems = [
  "영상 강의는 끝까지 못 듣겠어요",
  "뭘 만들어야 할지 모르겠어요",
  "이론을 열심히 들었지만, 만들 수 있는게 없어요"
];

export function EmpathySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="py-32 px-6 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="text-6xl mb-6"
          >
            😰
          </motion.div>
          <h2 className="mb-4 text-4xl md:text-5xl tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              이런 분들을 위한 서비스예요
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            코딩을 시작하려다 막힌 경험, 다들 있으시죠? 😢
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-200 hover:shadow-2xl transition-all backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-200 to-pink-200 rounded-full opacity-50 -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center mb-4 shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <X size={24} className="text-white" />
                  </motion.div>
                  <p className="text-gray-800 leading-relaxed">{problem}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(168, 85, 247, 0.3)" }}
            className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full text-xl shadow-2xl cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <CheckCircle size={28} />
            </motion.div>
            <span>그래서 <strong>손코딩</strong>으로 시작합니다 ✨</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}