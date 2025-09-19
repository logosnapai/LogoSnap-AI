import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SplashScreen({ onComplete }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Generate sparkle positions
    const sparklePositions = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30) * (Math.PI / 180),
      radius: 120 + Math.random() * 40
    }));
    setSparkles(sparklePositions);

    // Auto transition after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
    >
      {/* Animated Logo Container */}
      <div className="relative mb-8">
        {/* Central Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3 
          }}
          className="relative z-10"
        >
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68854b897f488e0906a65bb3/cb1952ec5_LogoSnapAI1024x1024Logo.png"
            alt="LogoSnap AI"
            className="w-32 h-32 rounded-3xl shadow-2xl"
          />
        </motion.div>

        {/* Orbiting Sparkles - BACK TO BEAUTIFUL EMOJI! */}
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute top-1/2 left-1/2 w-3 h-3"
            style={{
              transformOrigin: `${-sparkle.radius}px 0px`,
            }}
            initial={{ 
              rotate: sparkle.angle * (180 / Math.PI),
              opacity: 0 
            }}
            animate={{ 
              rotate: sparkle.angle * (180 / Math.PI) + 360,
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: sparkle.id * 0.1
            }}
          >
            <div className="w-3 h-3 sparkle">
              ✨
            </div>
          </motion.div>
        ))}

        {/* Orbital Ring Effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 border border-yellow-400/30 rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1], 
            opacity: [0, 0.6, 0.3],
            rotate: 360 
          }}
          transition={{ 
            duration: 2, 
            ease: "easeOut",
            delay: 0.8,
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        />
      </div>

      {/* App Name */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="text-4xl font-black mb-4 gold-gradient text-center"
      >
        LogoSnap AI
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="text-xl text-gray-300 text-center font-medium"
      >
        Instant Logo Maker
      </motion.p>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-8 flex space-x-1"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-yellow-400 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
