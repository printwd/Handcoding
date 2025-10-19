import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { PenTool, Camera, Play } from 'lucide-react';

const steps = [
  {
    icon: PenTool,
    title: "손코딩 템플릿 작성",
    description: "하루 15분 분량의 코드를 공책에 손으로 작성합니다",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Camera,
    title: "스마트폰 촬영",
    description: "작성한 코드를 촬영하면 OCR이 자동으로 인식합니다",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Play,
    title: "서버 실행",
    description: "인식된 코드가 실행되고, 오류 교정 가이드를 제공합니다",
    color: "from-pink-500 to-pink-600"
  }
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="py-32 px-6 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Cute floating elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 right-20 text-6xl opacity-30"
      >
        ✨
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 left-20 text-6xl opacity-30"
      >
        💫
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
            🎯
          </motion.div>
          <h2 className="mb-4 text-4xl md:text-5xl tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              이제 코딩, 이렇게 시작하세요
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            하루 15분이면 공책 위에서 프로그램 완성 ⏰
          </p>
          <motion.div 
            className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 rounded-full border-2 border-yellow-300 shadow-lg"
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl text-gray-800">
              "손으로 쓰면, <strong className="text-blue-600">결과가 나온다</strong>" 🚀
            </p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="p-8 h-full hover:shadow-2xl transition-all border-2 backdrop-blur-xl bg-white/80 hover:bg-white/90 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} text-white mb-6 shadow-xl`}
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon size={36} />
                    </motion.div>
                    
                    <div className="inline-block px-4 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm text-gray-600 mb-3">
                      STEP {index + 1}
                    </div>
                    <h3 className="mb-4 text-2xl text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 60px rgba(168, 85, 247, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all text-xl"
          >
            손코딩이 작동하는 방식 보기 👀
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}