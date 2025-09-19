import React, { useState } from "react";
import { motion } from "framer-motion";

// Simple Button component to replace shadcn dependency
const Button = ({ children, onClick, disabled, className = "", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  return (
    <button 
      className={`${baseStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Inline SVG icons to replace lucide-react
const Sparkles = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
  </svg>
);

const CreditCard = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const Check = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

export default function PaymentWall({ onPaymentSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate Stripe payment process
    setTimeout(() => {
      setIsProcessing(false);
      // Store credits in localStorage
      localStorage.setItem('logosnap_credits', '5');
      localStorage.setItem('logosnap_paid', 'true');
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
          <div className="gold-gradient font-bold text-lg mb-2">
            That's only 25 cents a logo!
          </div>
          <div className="text-gray-600 font-medium text-sm">
            One-time payment • No subscription
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
          Secure Checkout
        </p>
      </div>
    </motion.div>
  );
}
