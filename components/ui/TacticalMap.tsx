"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Zap, Target, Eye, Activity } from 'lucide-react';

// Fix pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Threat {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: 'attack' | 'suspicious' | 'scan' | 'intrusion';
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip: string;
  timestamp: string;
  details: string;
}

interface TacticalMapProps {
  threats?: Threat[];
  onThreatClick?: (threat: Threat) => void;
  onEngage?: (threat: Threat) => void;
}

// Composant pour mettre à jour la carte
function MapUpdater({ threats }: { threats: Threat[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (threats.length > 0) {
      const bounds = L.latLngBounds(threats.map(t => [t.lat, t.lng]));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [threats, map]);

  return null;
}

// Icônes personnalisées pour les menaces
const getThreatIcon = (severity: string) => {
  const colors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
    critical: '#7C2D12'
  };

  return L.divIcon({
    className: 'custom-threat-icon',
    html: `<div style="
      width: 20px;
      height: 20px;
      background-color: ${colors[severity as keyof typeof colors]};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

export default function TacticalMap({ 
  threats = [], 
  onThreatClick, 
  onEngage 
}: TacticalMapProps) {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [isEngaging, setIsEngaging] = useState(false);

  // Données de test si aucune menace n'est fournie
  const defaultThreats: Threat[] = [
    {
      id: '1',
      lat: 3.866,
      lng: 11.516,
      label: 'Attaque DDoS détectée',
      type: 'attack',
      severity: 'high',
      ip: '192.168.1.100',
      timestamp: new Date().toISOString(),
      details: 'Flux de trafic anormal détecté'
    },
    {
      id: '2',
      lat: 4.051,
      lng: 9.767,
      label: 'Scan de ports suspect',
      type: 'scan',
      severity: 'medium',
      ip: '10.0.0.50',
      timestamp: new Date().toISOString(),
      details: 'Scan de ports 22, 80, 443 détecté'
    },
    {
      id: '3',
      lat: 5.556,
      lng: 10.358,
      label: 'Tentative d\'intrusion',
      type: 'intrusion',
      severity: 'critical',
      ip: '172.16.0.25',
      timestamp: new Date().toISOString(),
      details: 'Tentative de connexion SSH échouée'
    }
  ];

  const displayThreats = threats.length > 0 ? threats : defaultThreats;

  const handleThreatClick = (threat: Threat) => {
    setSelectedThreat(threat);
    onThreatClick?.(threat);
  };

  const handleEngage = async (threat: Threat) => {
    setIsEngaging(true);
    try {
      // Simulation d'engagement Sentinel Zero
      await new Promise(resolve => setTimeout(resolve, 2000));
      onEngage?.(threat);
      console.log(`🚨 Sentinel Zero engagé contre ${threat.label}`);
    } finally {
      setIsEngaging(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'bg-green-500',
      medium: 'bg-yellow-500',
      high: 'bg-red-500',
      critical: 'bg-red-800'
    };
    return colors[severity as keyof typeof colors];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      attack: <Zap className="w-4 h-4" />,
      suspicious: <Eye className="w-4 h-4" />,
      scan: <Target className="w-4 h-4" />,
      intrusion: <AlertTriangle className="w-4 h-4" />
    };
    return icons[type as keyof typeof icons];
  };

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-gray-700">
      {/* Carte tactique */}
      <MapContainer 
        center={[3.866, 11.516]} 
        zoom={6} 
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater threats={displayThreats} />
        
        {displayThreats.map((threat) => (
          <Marker
            key={threat.id}
            position={[threat.lat, threat.lng]}
            icon={getThreatIcon(threat.severity)}
            eventHandlers={{
              click: () => handleThreatClick(threat)
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  {getTypeIcon(threat.type)}
                  <h3 className="font-bold text-sm">{threat.label}</h3>
                </div>
                <div className="space-y-1 text-xs">
                  <p><strong>IP:</strong> {threat.ip}</p>
                  <p><strong>Type:</strong> {threat.type}</p>
                  <p><strong>Détails:</strong> {threat.details}</p>
                  <Badge className={`${getSeverityColor(threat.severity)} text-white`}>
                    {threat.severity.toUpperCase()}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-2 bg-red-600 hover:bg-red-700"
                  onClick={() => handleEngage(threat)}
                  disabled={isEngaging}
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {isEngaging ? 'Engagement...' : 'Engager Sentinel'}
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Panneau de contrôle */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-gray-600">
        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Contrôle Tactique
        </h3>
        <div className="space-y-2 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Faible ({displayThreats.filter(t => t.severity === 'low').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Moyen ({displayThreats.filter(t => t.severity === 'medium').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Élevé ({displayThreats.filter(t => t.severity === 'high').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-800 rounded-full"></div>
            <span>Critique ({displayThreats.filter(t => t.severity === 'critical').length})</span>
          </div>
        </div>
      </div>

      {/* Détails de la menace sélectionnée */}
      {selectedThreat && (
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-gray-600 max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-bold flex items-center gap-2">
              {getTypeIcon(selectedThreat.type)}
              {selectedThreat.label}
            </h3>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={() => setSelectedThreat(null)}
            >
              ×
            </Button>
          </div>
          <div className="space-y-2 text-sm text-gray-300">
            <p><strong>IP:</strong> {selectedThreat.ip}</p>
            <p><strong>Type:</strong> {selectedThreat.type}</p>
            <p><strong>Détails:</strong> {selectedThreat.details}</p>
            <p><strong>Timestamp:</strong> {new Date(selectedThreat.timestamp).toLocaleString()}</p>
            <Badge className={`${getSeverityColor(selectedThreat.severity)} text-white`}>
              {selectedThreat.severity.toUpperCase()}
            </Badge>
          </div>
          <Button
            className="w-full mt-3 bg-red-600 hover:bg-red-700"
            onClick={() => handleEngage(selectedThreat)}
            disabled={isEngaging}
          >
            <Shield className="w-4 h-4 mr-2" />
            {isEngaging ? 'Engagement en cours...' : 'Engager Sentinel Zero'}
          </Button>
        </div>
      )}
    </div>
  );
} 