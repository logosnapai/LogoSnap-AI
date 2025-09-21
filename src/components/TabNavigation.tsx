import React from "react";
import { motion } from "framer-motion";

// Premium icons
const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const Star = ({ className }) => (
  <svg className={className} fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function TabNavigation({ activeTab, onTabChange, creditsRemaining, favoritesCount }) {
  const tabs = [
    { id: 'generate', label: 'Generate', icon: Sparkles },
    { id: 'favorites', label: 'Favorites', icon: Star, count: `${favoritesCount}/50` },
    { id: 'history', label: 'History', icon: Clock } // Changed from "try-again" to "history"
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800/30 z-40">
      {/* Premium ambient glow at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      
      <div className="flex justify-around items-center py-3 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 relative group"
              whileTap={{ scale: 0.95 }}
            >
              {/* Premium button background with inner glow */}
              <motion.div
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                className={`p-2 rounded-full relative ${
                  isActive 
                    ? 'gold-bg shadow-lg' 
                    : 'bg-gray-800/60 group-hover:bg-gray-700/60'
                }`}
              >
                {/* Inner rim lighting for active state */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 0 0px rgba(255, 215, 0, 0.4)',
                        '0 0 0 2px rgba(255, 215, 0, 0.6)',
                        '0 0 0 0px rgba(255, 215, 0, 0.4)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Icon with enhanced animations */}
                <motion.div
                  animate={isActive ? { 
                    rotate: tab.id === 'generate' ? [0, 10, -10, 0] : 0,
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ 
                    duration: tab.id === 'generate' ? 2 : 1.5, 
                    repeat: isActive ? Infinity : 0 
                  }}
                >
                  <Icon 
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-300'
                    }`} 
                  />
                </motion.div>
              </motion.div>

              {/* Enhanced label with gradient */}
              <span className={`text-xs font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent' 
                  : 'text-gray-400 group-hover:text-gray-300'
              }`}>
                {tab.label}
              </span>
              
              {/* Premium Favorites Counter */}
              {tab.id === 'favorites' && tab.count && (
                <motion.div 
                  className={`text-xs font-bold transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent' 
                      : 'text-gray-500'
                  }`}
                  animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {tab.count}
                </motion.div>
              )}
              
              {/* Enhanced Credits Counter with Pulsing Glow */}
              {tab.id === 'generate' && creditsRemaining !== null && (
                <motion.div 
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                  animate={{
                    boxShadow: [
                      '0 0 0 0px rgba(239, 68, 68, 0.4)',
                      '0 0 0 4px rgba(239, 68, 68, 0.1)',
                      '0 0 0 0px rgba(239, 68, 68, 0.4)'
                    ],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {creditsRemaining}
                </motion.div>
              )}

              {/* Micro sparkle particles for active generate tab */}
              {isActive && tab.id === 'generate' && (
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    className="absolute top-1 right-2 w-0.5 h-0.5 bg-yellow-300 rounded-full"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -8, 0],
                      x: [0, 4, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-orange-300 rounded-full"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, 6, 0],
                      x: [0, -3, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 1
                    }}
                  />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
