// Browser-only image storage utility
class ImageStorageManager {
  constructor() {
    this.dbName = 'LogoSnapDB';
    this.dbVersion = 1;
    this.storeName = 'favoriteImages';
    this.maxFavorites = 50;
  }

  // Initialize IndexedDB
  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
    });
  }

  // Convert URL to blob
  async urlToBlob(url) {
    try {
      const response = await fetch(url);
      return await response.blob();
    } catch (error) {
      console.error('Error fetching image blob:', error);
      throw error;
    }
  }

  // Save image to IndexedDB
  async saveFavoriteImage(logoData) {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      // Convert URL to blob
      const imageBlob = await this.urlToBlob(logoData.url);
      
      const favoriteData = {
        id: logoData.id,
        blob: imageBlob,
        prompt: logoData.prompt,
        createdAt: logoData.createdAt,
        favoritedAt: new Date().toISOString()
      };
      
      await new Promise((resolve, reject) => {
        const request = store.put(favoriteData);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
      
      db.close();
    } catch (error) {
      console.error('Error saving favorite image:', error);
      throw error;
    }
  }

  // Get all favorite images from IndexedDB
  async getAllFavorites() {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      const favorites = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      
      db.close();
      
      // Convert blobs to object URLs for display
      return favorites.map(favorite => ({
        ...favorite,
        url: URL.createObjectURL(favorite.blob)
      }));
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  // Remove favorite image from IndexedDB
  async removeFavoriteImage(logoId) {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      await new Promise((resolve, reject) => {
        const request = store.delete(logoId);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
      
      db.close();
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  // Get favorite count
  async getFavoriteCount() {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      const count = await new Promise((resolve, reject) => {
        const request = store.count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      
      db.close();
      return count;
    } catch (error) {
      console.error('Error getting favorite count:', error);
      return 0;
    }
  }

  // Check if at capacity
  async isAtCapacity() {
    const count = await this.getFavoriteCount();
    return count >= this.maxFavorites;
  }

  // Download image blob
  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export default new ImageStorageManager();
