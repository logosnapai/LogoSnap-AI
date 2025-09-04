import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "./ConfirmationModal";

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
