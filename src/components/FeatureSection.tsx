import { motion, useInView } from 'motion/react';
import { useRef, ReactNode } from 'react';
import { AnimatedCard } from './AnimatedCard';

interface FeatureSectionProps {
  title: string;
  description: string;
  emoji: string;
  imageUrl?: string;
  reverse?: boolean;
  bgGradient?: string;
}

export function FeatureSection({ 
  title, 
  description, 
  emoji,
  imageUrl,
  reverse = false,
  bgGradient = 'bg-gradient-to-br from-pink-100 to-purple-100'
}: FeatureSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="py-32 px-6">
      <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center ${reverse ? 'md:grid-flow-dense' : ''}`}>
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={reverse ? 'md:col-start-2' : ''}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.3 
            }}
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: 1.2
            }}
            className="inline-block mb-6 text-8xl cursor-pointer"
          >
            {emoji}
          </motion.div>
          
          <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {title}
          </h2>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -50 : 50, rotate: -5 }}
          animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={reverse ? 'md:col-start-1 md:row-start-1' : ''}
        >
          <AnimatedCard bgGradient={bgGradient}>
            {imageUrl ? (
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center p-12 relative overflow-hidden">
                <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="text-9xl opacity-30 absolute"
                >
                  {emoji}
                </motion.div>
                <div className="text-9xl z-10">
                  {emoji}
                </div>
              </div>
            )}
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  );
}
