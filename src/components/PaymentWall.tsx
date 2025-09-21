import React, { useState } from "react";
import { motion } from "framer-motion";

// Premium icons
const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const Zap = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Crown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
  </svg>
);

export default function PaymentWall({ onPaymentSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  const features = [
    { icon: Sparkles, text: "Generate 5 premium logos", highlight: true },
    { icon: Zap, text: "Instant AI-powered creation" },
    { icon: Shield, text: "Commercial usage rights" },
    { icon: Crown, text: "Premium quality outputs" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-3xl p-8 max-w-sm mx-auto text-black shadow-2xl relative overflow-hidden"
    >
      {/* Premium ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 pointer-events-none" />
      
      {/* Floating sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 12)}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-block mb-4"
        >
          <Crown className="w-12 h-12 text-yellow-600 mx-auto" />
        </motion.div>
        
        <h2 className="text-2xl font-black mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Unlock Premium Logos
        </h2>
        
        <p className="text-gray-600 font-medium">
          Professional AI-generated logos for your brand
        </p>
      </motion.div>

      {/* Features List */}
      <div className="space-y-4 mb-8 relative z-10">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                feature.highlight 
                  ? 'bg-yellow-50 border border-yellow-200' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <motion.div
                animate={feature.highlight ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={`p-2 rounded-full ${
                  feature.highlight 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                    : 'bg-gray-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${
                  feature.highlight ? 'text-white' : 'text-gray-600'
                }`} />
              </motion.div>
              
              <span className={`font-medium ${
                feature.highlight ? 'text-gray-900' : 'text-gray-700'
              }`}>
                {feature.text}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Pricing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-6 relative z-10"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0px rgba(255, 193, 7, 0.3)',
                '0 0 0 10px rgba(255, 193, 7, 0.1)',
                '0 0 0 0px rgba(255, 193, 7, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl"
          />
          
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-2xl relative">
            <div className="text-3xl font-black">$4.99</div>
            <div className="text-sm font-bold opacity-80">Only 25¢ per logo!</div>
          </div>
        </div>
      </motion.div>

      {/* Payment Button */}
      <motion.button
        onClick={handlePayment}
        disabled={isProcessing}
        className="relative w-full py-4 text-lg font-bold rounded-2xl gold-bg text-black hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group"
        whileTap={{ scale: 0.98 }}
      >
        {/* Premium gradient sweep effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 opacity-0 group-hover:opacity-40"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Enhanced sparkle particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + (i * 20)}%`,
                top: `${30 + (i % 2 * 40)}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Button content */}
        <div className="relative z-10">
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <motion.div 
                className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <span>Start Creating Now</span>
            </div>
          )}
        </div>
      </motion.button>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-4 text-xs text-gray-500 relative z-10"
      >
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Secure</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Instant</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>No subscription</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
