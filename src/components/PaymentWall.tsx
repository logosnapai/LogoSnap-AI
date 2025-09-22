import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CreditCard, Check } from "lucide-react";

// Inline Button component for bulletproof architecture
const Button = ({ children, onClick, disabled, className = "", style = {}, ...props }) => {
  return (
    <button 
      className={className}
      style={style}
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
      className="rounded-3xl p-6 mx-4 text-black shadow-2xl max-w-sm mx-auto"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
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
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/50"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF8C00)'
          }}
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
            "SVG & PNG premium downloads",
            "Commercial usage rights"
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center space-x-2"
            >
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF8C00)'
                }}
              >
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
          <motion.div 
            className="font-bold text-lg mb-2"
            style={{
              background: 'linear-gradient(90deg, #FFD700, #FF8C00, #FFD700, #FF8C00)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Only 25 cents a logo!
          </motion.div>
          <div className="text-gray-600 font-medium text-sm">
            One-time payment • No subscription
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full py-3 text-base font-medium rounded-2xl text-black hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF8C00)'
          }}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
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
