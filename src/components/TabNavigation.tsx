import React from "react";
import { motion } from "framer-motion";

// Simple icons to replace lucide-react
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

const RotateCcw = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 4v6h6M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
);

export default function TabNavigation({ activeTab, onTabChange, creditsRemaining, favoritesCount }) {
  const tabs = [
    { id: 'generate', label: 'Generate', icon: Sparkles },
    { id: 'favorites', label: 'Favorites', icon: Star, count: `${favoritesCount}/50` },
    { id: 'try-again', label: 'Try Again', icon: RotateCcw }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800 z-40">
      <div className="flex justify-around items-center py-3 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 relative"
            >
              <motion.div
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  rotateY: isActive ? 360 : 0
                }}
                transition={{ duration: 0.3 }}
                className={`p-2 rounded-full ${
                  isActive 
                    ? 'gold-bg shadow-lg shadow-yellow-500/50' 
                    : 'bg-gray-800'
                }`}
              >
                <Icon 
                  className={`w-5 h-5 ${
                    isActive ? 'text-black' : 'text-gray-400'
                  }`} 
                />
              </motion.div>
              <span className={`text-xs font-medium ${
                isActive ? 'gold-gradient' : 'text-gray-400'
              }`}>
                {tab.label}
              </span>
              
              {/* Favorites Counter */}
              {tab.id === 'favorites' && tab.count && (
                <div className={`text-xs font-bold ${
                  isActive ? 'text-yellow-500' : 'text-gray-500'
                }`}>
                  {tab.count}
                </div>
              )}
              
              {/* Credits Counter */}
              {tab.id === 'try-again' && creditsRemaining !== null && (
                <div className="absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {creditsRemaining}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
