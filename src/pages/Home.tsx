import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GenerateImage } from "../integrations/Core";

import SplashScreen from "../components/SplashScreen";
import TabNavigation from "../components/TabNavigation";
import PaymentWall from "../components/PaymentWall";
import PromptInput from "../components/PromptInput";
import LogoGrid from "../components/LogoGrid";
import FavoritesView from "../components/FavoritesView";
import FavoriteWarningModal from "../components/FavoriteWarningModal";

// Simple ImageStorage replacement for Bolt.new (no IndexedDB)
const ImageStorage = {
  urlToBlob: async (url) => {
    const response = await fetch(url);
    return await response.blob();
  },
  downloadBlob: (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
  isAtCapacity: () => false, // No capacity limit for synthetic testing
  saveFavoriteImage: async (logo) => { return true; }, // Mock save
  removeFavoriteImage: async (logoId) => { return true; }, // Mock remove
  getAllFavorites: async () => { return []; } // Mock get all
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [creditsRemaining, setCreditsRemaining] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGenerationLogos, setCurrentGenerationLogos] = useState([]);
  const [favoriteLogos, setFavoriteLogos] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [showFavoriteWarning, setShowFavoriteWarning] = useState(false);
  const [tempImageUrls, setTempImageUrls] = useState([]);

  const cleanupTempUrls = useCallback(() => {
    // Revoke temporary object URLs to free memory
    tempImageUrls.forEach(url => URL.revokeObjectURL(url));
    setTempImageUrls([]);
  }, [tempImageUrls]);

  const loadFavorites = async () => {
    try {
      const favorites = await ImageStorage.getAllFavorites();
      setFavoriteLogos(favorites);
      setFavoriteCount(favorites.length);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      // SYNTHETIC TESTING - No localStorage, start fresh each time
      setHasPaid(false);
      setCreditsRemaining(0);
      
      // Load favorites (empty for synthetic testing)
      await loadFavorites();
    };

    initializeApp();
  }, []);

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    setCreditsRemaining(5);
    // No localStorage for Bolt.new compatibility
  };

  const handleGenerate = async (prompt) => {
    if (creditsRemaining <= 0) return;
    
    setIsGenerating(true);
    
    // Clean up previous temporary images
    cleanupTempUrls();
    
    const generatedLogos = [];
    const newTempUrls = [];

    try {
      for (let i = 0; i < 4; i++) {
        const result = await GenerateImage({
          prompt: `${prompt}. Logo design ${i + 1}. Clean, professional, minimalist style.`
        });
        
        if (result && result.url) {
          // Fetch the image blob immediately
          const imageBlob = await ImageStorage.urlToBlob(result.url);
          const tempUrl = URL.createObjectURL(imageBlob);
          newTempUrls.push(tempUrl);
          
          const validLogo = {
            id: Date.now() + i + Math.random(),
            url: tempUrl,
            blob: imageBlob,
            prompt: prompt,
            createdAt: new Date().toISOString()
          };

          generatedLogos.push(validLogo);
        }
      }

      if (generatedLogos.length === 4) {
        // Store temporary URLs for cleanup later
        setTempImageUrls(newTempUrls);
        
        // Set current generation logos for display
        setCurrentGenerationLogos(generatedLogos);
        
        const newCredits = creditsRemaining - 1;
        setCreditsRemaining(newCredits);
      }
      
    } catch (error) {
      console.error('Error in handleGenerate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBookmark = async (logoId) => {
    const logo = currentGenerationLogos.find(l => l.id === logoId);
    if (!logo) return;
    
    const isAlreadyFavorite = favoriteLogos.some(f => f.id === logoId);
    
    if (isAlreadyFavorite) {
      // Remove from favorites
      setFavoriteLogos(prev => prev.filter(f => f.id !== logoId));
      setFavoriteCount(prev => prev - 1);
    } else {
      // Add to favorites
      setFavoriteLogos(prev => [...prev, logo]);
      setFavoriteCount(prev => prev + 1);
    }
  };

  const handleDownload = async (logo) => {
    try {
      let imageBlob = logo.blob || await ImageStorage.urlToBlob(logo.url);
      ImageStorage.downloadBlob(imageBlob, `logosnap-logo-${logo.id}.png`);
    } catch (error) {
      console.error('Error downloading logo:', error);
    }
  };

  const handleRemoveFavorite = async (logoId) => {
    setFavoriteLogos(prev => prev.filter(f => f.id !== logoId));
    setFavoriteCount(prev => prev - 1);
  };

  const isFavorite = (logoId) => {
    return favoriteLogos.some(f => f.id === logoId);
  };

  const handleViewFavorites = () => {
    setShowFavoriteWarning(false);
    setActiveTab('favorites');
  };

  const handleCancelFavoriteWarning = () => {
    setShowFavoriteWarning(false);
  };

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      cleanupTempUrls();
    };
  }, [cleanupTempUrls]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="pt-12 pb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black gold-gradient mb-2"
        >
          LogoSnap AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 font-medium"
        >
          Create stunning logos with AI
        </motion.p>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!hasPaid ? (
          <motion.div
            key="payment"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center justify-center min-h-96"
          >
            <PaymentWall onPaymentSuccess={handlePaymentSuccess} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {activeTab === 'generate' && (
              <div>
                <PromptInput
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  creditsRemaining={creditsRemaining}
                />
                {currentGenerationLogos.length > 0 && (
                  <LogoGrid
                    logos={currentGenerationLogos}
                    onBookmark={handleBookmark}
                    isFavorite={isFavorite}
                    onDownload={handleDownload}
                  />
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <FavoritesView
                favorites={favoriteLogos}
                onDownload={handleDownload}
                onRemoveFavorite={handleRemoveFavorite}
              />
            )}

            {activeTab === 'try-again' && (
              <div>
                <PromptInput
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  creditsRemaining={creditsRemaining}
                />
                {currentGenerationLogos.length > 0 && (
                  <LogoGrid
                    logos={currentGenerationLogos}
                    onBookmark={handleBookmark}
                    isFavorite={isFavorite}
                    onDownload={handleDownload}
                  />
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Navigation */}
      {hasPaid && (
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          creditsRemaining={creditsRemaining}
          favoritesCount={favoriteCount}
        />
      )}

      {/* Favorite Warning Modal */}
      <FavoriteWarningModal
        isOpen={showFavoriteWarning}
        onViewFavorites={handleViewFavorites}
        onCancel={handleCancelFavoriteWarning}
      />
    </div>
  );
}
