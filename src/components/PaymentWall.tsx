import React, { useState } from "react";
import { motion } from "framer-motion";

// Simple icons to replace lucide-react
const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const CreditCard = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const Check = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Simple Button component
const Button = ({ children, onClick, disabled, className = "", ...props }) => {
  return (
    <button 
      className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default function PaymentWall({ onPaymentSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // SYNTHETIC PAYMENT - Just simulate success for testing
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate successful purchase
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-3xl p-6 mx-4 text-black shadow-2xl max-w-sm mx-auto"
    >
      <div className="text-center">
        {/* Icon */}
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 gold-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/50"
        >
          <Sparkles className="w-8 h-8 text-black" />
        </motion.div>

        {/* Headline */}
        <h2 className="text-2xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Unlock AI Logo Magic
        </h2>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {[
            "5 custom logo generations",
            "20 logos (4 per generation)",
            "AI-powered design creation", 
            "HD transparent PNG downloads",
            "Commercial usage rights"
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center space-x-2"
            >
              <div className="w-5 h-5 gold-bg rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-black" />
              </div>
              <span className="text-gray-700 font-medium text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="text-center mb-6">
          <div className="text-4xl font-black text-gray-900 mb-1">
            $4.99
          </div>
          <div className="text-gray-600 font-medium text-sm mb-2">
            One-time payment • No subscription
          </div>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-3 mt-3">
            <div className="text-2xl font-black text-yellow-800">
              $0.25 per logo!
            </div>
            <div className="text-yellow-700 font-bold text-xs">
              That's just 25¢ each
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full py-3 text-base font-black rounded-2xl gold-bg text-black hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Get 5 Logo Generations</span>
            </div>
          )}
        </Button>

        <p className="text-xs text-gray-500 mt-3">
          Secure payment powered by RevenueCat
        </p>
      </div>
    </motion.div>
  );
}
