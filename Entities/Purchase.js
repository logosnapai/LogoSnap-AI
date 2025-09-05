// UserSettings entity - memory only, no server storage
export default class UserSettings {
    constructor() {
        this.favorites = []; // max 50 images
        this.theme = 'dark'; // default dark theme
        this.highlightColor = '#FFD700'; // yellow outline
        this.gradientButton = {
            start: '#FF4500', // darkest gradient orange
            end: '#FF8C00'
        };
        this.chatModel = 'gpt-4-mini'; // ChatGPT 4 Mini
    }

    addFavorite(image) {
        if (this.favorites.length >= 50) {
            this.favorites.shift(); // remove oldest if at max
        }
        this.favorites.push(image);
    }

    removeFavorite(index) {
        if (index >= 0 && index < this.favorites.length) {
            this.favorites.splice(index, 1);
        }
    }

    clearFavorites() {
        this.favorites = [];
    }

    updateTheme(theme) {
        this.theme = theme;
    }

    updateHighlightColor(color) {
        this.highlightColor = color;
    }

    updateGradientButton(start, end) {
        this.gradientButton.start = start;
        this.gradientButton.end = end;
    }

    setChatModel(model) {
        this.chatModel = model;
    }
}
