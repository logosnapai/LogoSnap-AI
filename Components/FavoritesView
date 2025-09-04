import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Download, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "./ConfirmationModal";

export default function FavoritesView({ favorites, onDownload, onRemoveFavorite }) {
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, logoId: null });
  
  // Sort favorites by when they were favorited (newest first)
  const sortedFavorites = [...favorites].sort((a, b) => 
    new Date(b.favoritedAt) - new Date(a.favoritedAt)
  );

  const handleStarClick = (logoId) => {
    setConfirmModal({ isOpen: true, logoId });
  };

  const handleConfirmRemove = () => {
    onRemoveFavorite(confirmModal.logoId);
    setConfirmModal({ isOpen: false, logoId: null });
  };

  const handleCancelRemove = () => {
    setConfirmModal({ isOpen: false, logoId: null });
  };

  if (sortedFavorites.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-8 mx-4 mb-8 text-center shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-600"
        >
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-bold mb-2">No Favorites Yet</h3>
          <p className="text-gray-500">
            Bookmark logos you love to save them here
          </p>
          <div className="text-sm text-gray-400 mt-4">
            Favorites: {favorites.length}/50
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="glass-card rounded-3xl p-6 mx-4 mb-8 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Your Favorite Logos
            </h3>
            <div className="text-sm text-gray-600 font-medium">
              Favorites: {favorites.length}/50 • Stored locally in your browser
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {sortedFavorites.map((logo, index) => {
              // Number based on position in sorted array (newest = 1)
              const favoriteNumber = index + 1;
              
              return (
                <motion.div
                  key={logo.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-lg"
                >
                  {/* Favorite Number Badge */}
                  <div className="absolute -top-2 -left-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center z-10 shadow-lg">
                    {favoriteNumber}
                  </div>

                  {/* Perfect Square Container */}
                  <div className="aspect-square p-4">
                    {/* Logo Image Container - Perfect Square */}
                    <div className="aspect-square bg-white rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                      <img
                        src={logo.url}
                        alt={`Favorite logo #${favoriteNumber}`}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between px-2">
                      {/* Remove Favorite */}
                      <button
                        onClick={() => handleStarClick(logo.id)}
                        className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 hover:text-gray-400 hover:fill-gray-400 transition-colors duration-300" />
                      </button>

                      {/* Download Button */}
                      <Button
                        onClick={() => onDownload(logo)}
                        size="sm"
                        className="gold-bg text-black font-bold text-xs px-3 py-1 rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>HD</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        title="Remove from Favorites?"
        message="Are you sure you want to remove this logo from your favorites? It will be permanently deleted from your browser storage."
      />
    </>
  );
}
