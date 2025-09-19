import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CreditCard, Check } from "lucide-react";

export default function PaymentWall({ onPaymentSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate Stripe payment process - No localStorage for Bolt.new
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl p-6 mx-4 text-black shadow-2xl max-w-sm mx-auto"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
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
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            boxShadow: '0 10px 25px rgba(255, 215, 0, 0.5)'
          }}
        >
          <Sparkles className="w-8 h-8 text-black" />
        </motion.div>

        {/* Headline */}
        <h2 
          className="text-2xl font-black mb-4"
          style={{
            background: 'linear-gradient(to right, #1f2937, #374151)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Unlock AI Logo Magic
        </h2>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {[
            "5 custom logo generations",
            "20 logos (4 per generation)",
            "AI-powered design creation", 
            "HD images PNG downloads", 
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
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)'
                }}
              >
                <Check className="w-3 h-3 text-black" />
              </div>
              <span className="text-gray-700 font-medium text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="text-4xl font-black text-gray-900 mb-1">
            $4.99
          </div>
          <div className="text-gray-600 font-medium text-sm">
            One-time payment • No subscription
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full py-3 text-base font-black rounded-2xl text-black transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            boxShadow: isProcessing ? 'none' : '0 10px 25px rgba(255, 215, 0, 0.5)'
          }}
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
        </button>
      </div>
    </motion.div>
  );
}
