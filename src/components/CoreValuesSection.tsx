import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { Clock, Users, Target } from 'lucide-react';

const values = [
  {
    icon: Clock,
    title: "하루 15분 실전 완성",
    subtitle: "나만의 첫 앱 완성",
    description: "꾸준히 따라 하면 3개월 만에 실제 작동하는 앱을 완성할 수 있습니다",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100"
  },
  {
    icon: Users,
    title: "초보도 가능한 손코딩",
    subtitle: "이론보다 '직접 쓰기' 중심",
    description: "공책 + 스마트폰만 있으면 시작. 비전공자를 위한 맞춤 설계입니다",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100"
  },
  {
    icon: Target,
    title: "지속 & 피드백",
    subtitle: "혼자서도 완주 가능",
    description: "주차별 목표 설정과 Q&A 채널로 끝까지 함께합니다",
    color: "from-pink-500 to-pink-600",
    bgColor: "from-pink-50 to-pink-100"
  }
];

export function CoreValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="py-32 px-6 bg-gradient-to-b from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Cute floating elements */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 360],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 left-10 text-6xl opacity-20"
      >
        💎
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-10 right-10 text-6xl opacity-20"
      >
        ⭐
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            💎
          </motion.div>
          <h2 className="mb-4 text-4xl md:text-5xl tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              손코딩이 특별한 이유
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            3가지 핵심 가치로 여러분의 성공을 보장합니다 ✨
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
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
                <Card className={`p-8 h-full hover:shadow-2xl transition-all border-2 bg-gradient-to-br ${value.bgColor} backdrop-blur-sm relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white to-transparent rounded-full opacity-50 -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${value.color} text-white mb-6 shadow-xl`}
                      whileHover={{ 
                        rotate: [0, -15, 15, -15, 0],
                        scale: 1.2
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon size={36} />
                    </motion.div>
                    
                    <div className="inline-block px-4 py-1 bg-white/60 backdrop-blur-sm rounded-full text-sm text-gray-600 mb-3 border border-white/80">
                      0{index + 1}
                    </div>
                    
                    <h3 className="mb-3 text-2xl text-gray-800">
                      {value.title}
                    </h3>
                    
                    <motion.p 
                      className="mb-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      {value.subtitle}
                    </motion.p>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
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
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.3 }}
          >
            <Card className="inline-block p-8 bg-gradient-to-r from-white via-purple-50 to-pink-50 border-2 border-purple-300 shadow-2xl">
              <p className="text-xl text-gray-700">
                <strong className="text-blue-600">실전 중심</strong> × <strong className="text-purple-600">손코딩</strong> × <strong className="text-pink-600">지속 가능</strong> = <strong className="text-3xl bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">성공 🎉</strong>
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}