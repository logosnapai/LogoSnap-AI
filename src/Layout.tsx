import React from "react";
import { motion } from "framer-motion";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-black text-white font-bold">
      <style>{`
        :root {
          --gold-gradient: linear-gradient(135deg, #FFD700, #FFA500, #FF8C00);
          --gold-text: linear-gradient(135deg, #FFD700, #FFA500);
        }
        
        .gold-gradient {
          background: var(--gold-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gold-bg {
          background: var(--gold-gradient);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .sparkle {
          filter: drop-shadow(0 0 6px #FFD700);
        }
      `}</style>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
}