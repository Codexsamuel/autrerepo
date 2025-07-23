// 🌤️ API Météo pour Simulation de Drones
// Intégration avec OpenWeatherMap + données simulées en fallback

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  conditions: 'clear' | 'cloudy' | 'rain' | 'storm' | 'fog' | 'snow';
  isSafe: boolean;
  warnings: string[];
  timestamp: number;
}

interface WeatherConfig {
  apiKey?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  useRealData?: boolean;
  updateInterval?: number; // en millisecondes
}

class WeatherAPI {
  private config: WeatherConfig;
  private cache: Map<string, WeatherData> = new Map();
  private lastUpdate: number = 0;

  constructor(config: WeatherConfig = {}) {
    this.config = {
      apiKey: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
      city: 'Paris',
      latitude: 48.8566,
      longitude: 2.3522,
      useRealData: true,
      updateInterval: 300000, // 5 minutes
      ...config
    };
  }

  // 🌍 Récupère les données météo réelles
  async getRealWeatherData(): Promise<WeatherData | null> {
    try {
      if (!this.config.apiKey) {
        console.warn('🔑 Clé API OpenWeather non configurée');
        return null;
      }

      const url = this.config.latitude && this.config.longitude
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${this.config.latitude}&lon=${this.config.longitude}&appid=${this.config.apiKey}&units=metric&lang=fr`
        : `https://api.openweathermap.org/data/2.5/weather?q=${this.config.city}&appid=${this.config.apiKey}&units=metric&lang=fr`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      
      const weatherData: WeatherData = {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg || 0,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // conversion en km
        conditions: this.mapWeatherConditions(data.weather[0].main),
        isSafe: this.checkSafetyConditions(data),
        warnings: this.generateWarnings(data),
        timestamp: Date.now()
      };

      return weatherData;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des données météo:', error);
      return null;
    }
  }

  // 🎲 Génère des données météo simulées réalistes
  generateSimulatedWeatherData(): WeatherData {
    const baseTime = Date.now() / 1000000; // Pour la variation temporelle
    
    // Simulation réaliste basée sur l'heure et la saison
    const hour = new Date().getHours();
    const month = new Date().getMonth();
    
    // Température de base selon la saison
    let baseTemp = 15;
    if (month >= 3 && month <= 5) baseTemp = 20; // Printemps
    else if (month >= 6 && month <= 8) baseTemp = 25; // Été
    else if (month >= 9 && month <= 11) baseTemp = 18; // Automne
    else baseTemp = 8; // Hiver

    // Variation diurne
    const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 8;
    const temperature = baseTemp + tempVariation + (Math.random() - 0.5) * 5;

    // Conditions météo simulées
    const conditions = this.getSimulatedConditions(temperature, hour);
    
    // Vent basé sur les conditions
    const windSpeed = conditions === 'storm' 
      ? Math.random() * 20 + 15 
      : conditions === 'rain' 
        ? Math.random() * 10 + 5 
        : Math.random() * 8 + 2;

    const weatherData: WeatherData = {
      temperature: Math.round(temperature * 10) / 10,
      humidity: Math.min(100, Math.max(30, 60 + Math.sin(baseTime) * 20 + (Math.random() - 0.5) * 20)),
      windSpeed: Math.round(windSpeed * 10) / 10,
      windDirection: Math.random() * 360,
      pressure: 1013 + Math.sin(baseTime * 0.1) * 20 + (Math.random() - 0.5) * 10,
      visibility: conditions === 'fog' ? Math.random() * 2 + 0.5 : Math.random() * 10 + 5,
      conditions,
      isSafe: this.checkSimulatedSafety(temperature, windSpeed, conditions),
      warnings: this.generateSimulatedWarnings(temperature, windSpeed, conditions),
      timestamp: Date.now()
    };

    return weatherData;
  }

  // 🎯 Récupère les données météo (réelles ou simulées)
  async getWeatherData(): Promise<WeatherData> {
    const cacheKey = `${this.config.latitude},${this.config.longitude}`;
    const now = Date.now();

    // Vérifier le cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (now - cached.timestamp < this.config.updateInterval!) {
        return cached;
      }
    }

    let weatherData: WeatherData;

    if (this.config.useRealData) {
      const realData = await this.getRealWeatherData();
      if (realData) {
        weatherData = realData;
      } else {
        console.log('🔄 Utilisation des données simulées (fallback)');
        weatherData = this.generateSimulatedWeatherData();
      }
    } else {
      weatherData = this.generateSimulatedWeatherData();
    }

    // Mettre en cache
    this.cache.set(cacheKey, weatherData);
    this.lastUpdate = now;

    return weatherData;
  }

  // 🛡️ Vérifie les conditions de sécurité pour les drones
  private checkSafetyConditions(data: any): boolean {
    const windSpeed = data.wind.speed;
    const visibility = data.visibility / 1000;
    const conditions = this.mapWeatherConditions(data.weather[0].main);

    return (
      windSpeed < 15 && // Vent < 15 m/s
      visibility > 1 && // Visibilité > 1 km
      conditions !== 'storm' &&
      conditions !== 'fog'
    );
  }

  // 🛡️ Vérifie les conditions de sécurité simulées
  private checkSimulatedSafety(temp: number, windSpeed: number, conditions: string): boolean {
    return (
      windSpeed < 15 &&
      temp > -10 && temp < 50 &&
      conditions !== 'storm' &&
      conditions !== 'fog'
    );
  }

  // ⚠️ Génère des avertissements météo
  private generateWarnings(data: any): string[] {
    const warnings: string[] = [];
    
    if (data.wind.speed > 10) {
      warnings.push(`Vent fort: ${data.wind.speed} m/s`);
    }
    
    if (data.visibility < 5000) {
      warnings.push(`Visibilité réduite: ${data.visibility / 1000} km`);
    }
    
    if (data.weather[0].main === 'Thunderstorm') {
      warnings.push('Orages détectés - Vol interdit');
    }
    
    if (data.main.temp < 0) {
      warnings.push('Température négative - Risque de givrage');
    }

    return warnings;
  }

  // ⚠️ Génère des avertissements simulés
  private generateSimulatedWarnings(temp: number, windSpeed: number, conditions: string): string[] {
    const warnings: string[] = [];
    
    if (windSpeed > 10) {
      warnings.push(`Vent fort: ${windSpeed.toFixed(1)} m/s`);
    }
    
    if (temp < 0) {
      warnings.push('Température négative - Risque de givrage');
    }
    
    if (conditions === 'storm') {
      warnings.push('Conditions orageuses - Vol interdit');
    }
    
    if (conditions === 'fog') {
      warnings.push('Brouillard - Visibilité réduite');
    }

    return warnings;
  }

  // 🌤️ Mappe les conditions météo OpenWeather vers nos types
  private mapWeatherConditions(openWeatherCondition: string): WeatherData['conditions'] {
    const mapping: Record<string, WeatherData['conditions']> = {
      'Clear': 'clear',
      'Clouds': 'cloudy',
      'Rain': 'rain',
      'Drizzle': 'rain',
      'Thunderstorm': 'storm',
      'Snow': 'snow',
      'Mist': 'fog',
      'Smoke': 'fog',
      'Haze': 'fog',
      'Dust': 'fog',
      'Fog': 'fog',
      'Sand': 'fog',
      'Ash': 'fog',
      'Squall': 'storm',
      'Tornado': 'storm'
    };

    return mapping[openWeatherCondition] || 'clear';
  }

  // 🎲 Génère des conditions simulées réalistes
  private getSimulatedConditions(temp: number, hour: number): WeatherData['conditions'] {
    const rand = Math.random();
    
    // Probabilités basées sur la température et l'heure
    if (temp < 0 && rand < 0.3) return 'snow';
    if (temp > 25 && rand < 0.2) return 'storm';
    if (hour >= 22 || hour <= 6) {
      if (rand < 0.4) return 'fog';
    }
    if (rand < 0.3) return 'rain';
    if (rand < 0.6) return 'cloudy';
    return 'clear';
  }

  // 📊 Obtient des statistiques météo pour la simulation
  getWeatherStats(): {
    averageTemp: number;
    windTrend: 'increasing' | 'decreasing' | 'stable';
    safetyScore: number;
  } {
    const entries = Array.from(this.cache.values());
    if (entries.length === 0) {
      return {
        averageTemp: 20,
        windTrend: 'stable',
        safetyScore: 0.8
      };
    }

    const avgTemp = entries.reduce((sum, entry) => sum + entry.temperature, 0) / entries.length;
    
    // Tendance du vent (simplifiée)
    const recentWinds = entries.slice(-3).map(e => e.windSpeed);
    const windTrend = recentWinds.length >= 2 
      ? recentWinds[recentWinds.length - 1] > recentWinds[0] 
        ? 'increasing' 
        : recentWinds[recentWinds.length - 1] < recentWinds[0] 
          ? 'decreasing' 
          : 'stable'
      : 'stable';

    const safetyScore = entries.filter(e => e.isSafe).length / entries.length;

    return {
      averageTemp: Math.round(avgTemp * 10) / 10,
      windTrend,
      safetyScore: Math.round(safetyScore * 100) / 100
    };
  }

  // 🔄 Met à jour la configuration
  updateConfig(newConfig: Partial<WeatherConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.cache.clear(); // Vider le cache lors du changement de config
  }

  // 🧹 Nettoie le cache
  clearCache(): void {
    this.cache.clear();
  }
}

// Instance globale
const weatherAPI = new WeatherAPI();

export default weatherAPI;
export type { WeatherConfig, WeatherData };

