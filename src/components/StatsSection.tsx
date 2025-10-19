import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { AnimatedCard } from "./AnimatedCard";

interface StatItemProps {
  number: string;
  label: string;
  emoji: string;
  delay: number;
  bgGradient: string;
}

function StatItem({
  number,
  label,
  emoji,
  delay,
  bgGradient,
}: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 200,
      }}
    >
      <AnimatedCard
        className="p-8 text-center"
        bgGradient={bgGradient}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: delay + 0.2,
          }}
          className="text-6xl mb-4"
        >
          {emoji}
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: delay + 0.3,
          }}
          className="mb-2 text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          {number}
        </motion.div>
        <div className="text-gray-700">{label}</div>
      </AnimatedCard>
    </motion.div>
  );
}

export function StatsSection() {
  const stats = [
    {
      number: "15분",
      label: "하루 학습 시간",
      emoji: "⏰",
      delay: 0.1,
      bgGradient: "bg-gradient-to-br from-blue-100 to-blue-200",
    },
    {
      number: "12주",
      label: "완성까지 기간",
      emoji: "📅",
      delay: 0.2,
      bgGradient:
        "bg-gradient-to-br from-purple-100 to-purple-200",
    },
    {
      number: "100%",
      label: "실전 프로젝트",
      emoji: "🎯",
      delay: 0.3,
      bgGradient: "bg-gradient-to-br from-pink-100 to-pink-200",
    },
    {
      number: "0원",
      label: "준비물 추가 비용",
      emoji: "💰",
      delay: 0.4,
      bgGradient:
        "bg-gradient-to-br from-yellow-100 to-yellow-200",
    },
  ];

  return (
    <div className="py-32 px-6 bg-gradient-to-b from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Cute floating elements */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 15, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-10 text-7xl opacity-20"
      >
        📊
      </motion.div>

      <motion.div
        animate={{
          y: [0, 25, 0],
          rotate: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-10 right-10 text-7xl opacity-20"
      >
        ✨
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 0.2,
            }}
            className="text-6xl mb-6"
          >
            📊
          </motion.div>
          <h2 className="mb-4 text-4xl md:text-5xl tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              손코딩의 숫자들
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            간단하고 명확한 학습 시스템 ✨
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}