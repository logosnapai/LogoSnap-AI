import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, RotateCcw } from "lucide-react";

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
