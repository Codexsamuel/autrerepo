"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Rocket, Download, Mic, Map, Shield, Zap, Eye, Target } from 'lucide-react';

interface Mission {
  id: string;
  name: string;
  type: string;
  controller: string;
  zone: string;
  objectif: string;
  mission: string;
  firmware: string;
  gcode: string;
  created_at: string;
}

export default function DroneBuilder() {
  const [type, setType] = useState('militaire');
  const [controller, setController] = useState('ESP32');
  const [zone, setZone] = useState('12.1565°N, 15.3075°E');
  const [objectif, setObjectif] = useState('surveillance tactique');
  const [name, setName] = useState('Sentinel V1');
  const [result, setResult] = useState('');
  const [firmware, setFirmware] = useState('');
  const [gcode, setGcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // Simulation Supabase (remplacer par vraie connexion)
  const fetchMissions = async () => {
    // Simulation des données
    const mockMissions: Mission[] = [
      {
        id: '1',
        name: 'Sentinel V1',
        type: 'militaire',
        controller: 'ESP32',
        zone: '12.1565°N, 15.3075°E',
        objectif: 'surveillance tactique',
        mission: 'Mission de reconnaissance dans la zone nord-est...',
        firmware: '// Code ESP32 pour drone militaire...',
        gcode: '; G-code pour impression châssis...',
        created_at: new Date().toISOString()
      }
    ];
    setMissions(mockMissions);
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const generateMission = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/drone/mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          objectif,
          zone
        })
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.mission);
      } else {
        setResult('Erreur lors de la génération de la mission');
      }
    } catch (error) {
      console.error('Erreur génération mission:', error);
      setResult('Erreur lors de la génération de la mission');
    }
    setLoading(false);
  };

  const generateFirmware = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/drone/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          controller,
          type,
          name
        })
      });
      const data = await response.json();
      if (data.success) {
        setFirmware(data.firmware);
      } else {
        setFirmware('Erreur lors de la génération du firmware');
      }
    } catch (error) {
      console.error('Erreur génération firmware:', error);
      setFirmware('Erreur lors de la génération du firmware');
    }
    setLoading(false);
  };

  const generateGcode = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/drone/gcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          name
        })
      });
      const data = await response.json();
      if (data.success) {
        setGcode(data.gcode);
      } else {
        setGcode('Erreur lors de la génération du G-code');
      }
    } catch (error) {
      console.error('Erreur génération G-code:', error);
      setGcode('Erreur lors de la génération du G-code');
    }
    setLoading(false);
  };

  const download = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendToNovaBot = async () => {
    try {
      await fetch('/api/nova-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          objectif,
          zone,
          firmware,
          gcode,
        })
      });
      alert('✅ Données envoyées à NovaBot avec succès');
    } catch (error) {
      console.error('Erreur envoi NovaBot:', error);
      alert('❌ Erreur lors de l\'envoi à NovaBot');
    }
  };

  const handleVoiceCommand = async () => {
    if (!voiceCommand.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/ai/gpt4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'novaia',
          message: `Commande vocale: ${voiceCommand}. Que dois-je faire ?`,
          context: 'Interprétation de commande vocale pour drone'
        })
      });
      const data = await response.json();
      
      // Interprétation de la commande
      if (voiceCommand.toLowerCase().includes('mission')) {
        await generateMission();
      } else if (voiceCommand.toLowerCase().includes('firmware')) {
        await generateFirmware();
      } else if (voiceCommand.toLowerCase().includes('gcode')) {
        await generateGcode();
      }
      
      setVoiceCommand('');
    } catch (error) {
      console.error('Erreur commande vocale:', error);
    }
    setLoading(false);
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    // Simulation d'enregistrement vocal
    setTimeout(() => {
      setIsRecording(false);
      setVoiceCommand('Générer mission de surveillance');
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Rocket className="h-8 w-8 text-red-600" />
        <h1 className="text-3xl font-bold">🧠 DroneBuilder | Sentinel Zero IA</h1>
        <Badge variant="destructive">MILITAIRE</Badge>
      </div>

      {/* Configuration du drone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Configuration du Drone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom du drone</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sentinel V1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type de drone</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="militaire">Militaire</SelectItem>
                  <SelectItem value="industriel">Industriel</SelectItem>
                  <SelectItem value="surveillance">Surveillance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Microcontrôleur</label>
              <Select value={controller} onValueChange={setController}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ESP32">ESP32</SelectItem>
                  <SelectItem value="Arduino">Arduino</SelectItem>
                  <SelectItem value="Raspberry Pi">Raspberry Pi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Zone d'opération</label>
              <Input
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                placeholder="12.1565°N, 15.3075°E"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Objectif de la mission</label>
              <Input
                value={objectif}
                onChange={(e) => setObjectif(e.target.value)}
                placeholder="surveillance tactique"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Actions IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={generateMission} disabled={loading} className="bg-red-600 hover:bg-red-700">
              🎯 Générer Mission IA
            </Button>
            <Button onClick={generateFirmware} disabled={loading} className="bg-green-600 hover:bg-green-700">
              ⚙️ Générer Firmware
            </Button>
            <Button onClick={generateGcode} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              🖨️ Générer G-code
            </Button>
            <Button onClick={sendToNovaBot} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              🔗 Envoyer vers NovaBot
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contrôle vocal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Contrôle Vocal IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button 
              onClick={startVoiceRecording} 
              disabled={isRecording}
              variant={isRecording ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isRecording ? "🎙️ Enregistrement..." : "🎙️ Commencer enregistrement"}
            </Button>
            <Input
              value={voiceCommand}
              onChange={(e) => setVoiceCommand(e.target.value)}
              placeholder="Ex: Générer firmware pour drone militaire"
              className="flex-1"
            />
            <Button onClick={handleVoiceCommand} disabled={!voiceCommand.trim() || loading}>
              ▶️ Exécuter
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-blue-600">⏳ IA en cours de génération...</p>
        </div>
      )}

      {/* Résultats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Mission IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={result}
              readOnly
              rows={8}
              className="font-mono text-sm"
              placeholder="La mission IA sera générée ici..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Firmware {controller}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={firmware}
              readOnly
              rows={8}
              className="font-mono text-sm"
              placeholder="Le code firmware sera généré ici..."
            />
            <Button 
              onClick={() => download(firmware, `${name}.ino`, 'text/plain')}
              disabled={!firmware}
              className="mt-2"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Télécharger Firmware
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              G-code Châssis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={gcode}
              readOnly
              rows={8}
              className="font-mono text-sm"
              placeholder="Le G-code sera généré ici..."
            />
            <Button 
              onClick={() => download(gcode, `${name}.gcode`, 'text/plain')}
              disabled={!gcode}
              className="mt-2"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Télécharger G-code
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Simulateur 3D */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Simulateur IA Red/Blue Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="h-96 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">🚁</div>
                <p className="text-lg font-semibold">Simulateur 3D Unity WebGL</p>
                <p className="text-sm">Simulation temps réel drone tactique + défense Blue Team</p>
                <p className="text-xs text-gray-500 mt-2">
                  Intégration Unity + carte terrain + modèle drone FPV
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historique des missions */}
      <Card>
        <CardHeader>
          <CardTitle>📦 Historique des Missions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {missions.map((mission) => (
              <div key={mission.id} className="bg-gray-50 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{mission.name}</h4>
                    <p className="text-sm text-gray-600">
                      {mission.type} • {mission.objectif}
                    </p>
                    <code className="text-xs text-gray-500">{mission.zone}</code>
                  </div>
                  <Badge variant="outline">
                    {new Date(mission.created_at).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 