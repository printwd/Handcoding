import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface ParallaxSectionProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  emoji: string;
}

export function ParallaxSection({ imageUrl, title, subtitle, emoji }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <div 
          className="w-full h-[120%] bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            filter: 'brightness(0.6) saturate(1.2)'
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 to-pink-600/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="h-full flex flex-col items-center justify-center px-6 text-white text-center"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-9xl mb-6"
        >
          {emoji}
        </motion.div>
        
        <h2 className="mb-6 text-5xl md:text-6xl lg:text-7xl tracking-tight drop-shadow-lg">
          {title}
        </h2>
        <p className="max-w-2xl text-xl md:text-2xl drop-shadow-lg">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
}
