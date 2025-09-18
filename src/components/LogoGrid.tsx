import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationModal from "./ConfirmationModal";

// Simple Button component to replace shadcn dependency
const Button = ({ children, onClick, disabled, size = "default", className = "", ...props }) => {
  const sizeClasses = {
    default: "px-4 py-2",
    sm: "px-2 py-1 text-sm"
  };
  
  return (
    <button 
      className={`${sizeClasses[size]} rounded-lg font-medium transition-colors focus:outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple icons to replace lucide-react
const Star = ({ className }) => (
  <svg className={className} fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const Download = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const Loader2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.49 8.49l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.49-8.49l2.83-2.83" />
  </svg>
);

export default function LogoGrid({ logos, onBookmark, isFavorite, onDownload }) {
  const [downloadingId, setDownloadingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, logoId: null });

  const handleDownload = async (logo) => {
    setDownloadingId(logo.id);
    
    // Simulate download process
    setTimeout(() => {
      onDownload(logo);
      setDownloadingId(null);
    }, 1500);
  };

  const handleBookmarkClick = (logoId) => {
    const isCurrentlyFavorite = isFavorite(logoId);
    
    if (isCurrentlyFavorite) {
      // Show confirmation modal for unfavoriting
      setConfirmModal({ isOpen: true, logoId });
    } else {
      // Directly add to favorites
      onBookmark(logoId);
    }
  };

  const handleConfirmUnfavorite = () => {
    onBookmark(confirmModal.logoId);
    setConfirmModal({ isOpen: false, logoId: null });
  };

  const handleCancelUnfavorite = () => {
    setConfirmModal({ isOpen: false, logoId: null });
  };

  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <>
      <div className="glass-card rounded-3xl p-6 mx-4 mt-6 mb-8 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          {logos.map((logo, index) => {
            const isCurrentlyFavorite = isFavorite(logo.id);
            
            return (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Perfect Square Container */}
                <div className="aspect-square p-4">
                  {/* Logo Image Container - Perfect Square */}
                  <div className="aspect-square bg-white rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={logo.url}
                      alt={`Generated logo ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between px-2">
                    {/* Bookmark Button */}
                    <button
                      onClick={() => handleBookmarkClick(logo.id)}
                      className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 transition-all duration-300 ${
                          isCurrentlyFavorite
                            ? 'text-yellow-500 fill-yellow-500 drop-shadow-lg'
                            : 'text-gray-400 hover:text-yellow-400'
                        }`}
                      />
                    </button>

                    {/* Download Button */}
                    <AnimatePresence>
                      {isCurrentlyFavorite && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <Button
                            onClick={() => handleDownload(logo)}
                            disabled={downloadingId === logo.id}
                            size="sm"
                            className="gold-bg text-black font-bold text-xs px-3 py-1 rounded-lg hover:shadow-lg transition-all duration-300"
                          >
                            {downloadingId === logo.id ? (
                              <div className="flex items-center space-x-1">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>HD</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1">
                                <Download className="w-3 h-3" />
                                <span>HD</span>
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onConfirm={handleConfirmUnfavorite}
        onCancel={handleCancelUnfavorite}
        title="Remove from Favorites?"
        message="Are you sure you want to remove this logo from your favorites?"
      />
    </>
  );
}
