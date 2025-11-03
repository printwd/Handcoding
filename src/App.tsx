import { motion } from "motion/react";
import { Hero } from "./components/Hero";
import { EmpathySection } from "./components/EmpathySection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { StatsSection } from "./components/StatsSection";
import { CurriculumSection } from "./components/CurriculumSection";
import { CoreValuesSection } from "./components/CoreValuesSection";
import { OCRDemo } from "./components/OCRDemo";
import { CallToAction } from "./components/CallToAction";

export default function App() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <Hero />

      {/* 공감 섹션 */}
      <EmpathySection />

      {/* 해결 제안 섹션 */}
      <HowItWorksSection />

      {/* Stats Section */}
      <StatsSection />

      {/* 커리큘럼 섹션 */}
      <CurriculumSection />

      {/* 핵심 가치 3가지 */}
      <CoreValuesSection />

      {/* OCR Demo - Interactive Experience */}
      <OCRDemo />

      {/* Call to Action */}
      <CallToAction />

      {/* Footer */}
      <footer className="py-16 px-6 bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 text-white relative overflow-hidden">
        {/* Cute floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 right-10 text-5xl"
        >
          ✨
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-10 left-10 text-4xl"
        >
          💫
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">✍️</span>
                <h3 className="text-2xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  초보탈출 손코딩
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                하루 15분, 손으로 프로그램 완성하기. 💻
                <br />
                비전공자도 가능한 손코딩 학습 서비스 ✨
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-4 text-xl flex items-center gap-2">
                <span>🎯</span> 서비스
              </h3>
              <ul className="space-y-3 text-gray-400">
                <motion.li
                  whileHover={{ x: 5, color: "#fff" }}
                  className="transition-all cursor-pointer"
                >
                  📚 커리큘럼
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#fff" }}
                  className="transition-all cursor-pointer"
                >
                  🎮 무료 체험
                </motion.li>
                <motion.li
                  whileHover={{ x: 5, color: "#fff" }}
                  className="transition-all cursor-pointer"
                >
                  📖 학습 가이드
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-4 text-xl flex items-center gap-2">
                <span>💬</span> 문의
              </h3>
              <ul className="space-y-3 text-gray-400">
                <motion.li
                  whileHover={{ scale: 1.05, color: "#fff" }}
                  className="transition-all"
                >
                  📧 suhodang77@gmail.com
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05, color: "#fff" }}
                  className="transition-all"
                >
                  💬 카카오톡: @손코딩랩
                </motion.li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-gray-700 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex justify-center items-center gap-2 mb-3">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                ©
              </motion.span>
              <p className="text-gray-400">
                2025 손코딩랩. All rights reserved.
              </p>
            </div>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>💜</span>
              비전공자를 위한 손코딩 학습 플랫폼
              <span>✨</span>
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
