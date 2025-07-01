'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Euro, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Info,
  Home,
  Building,
  Navigation
} from 'lucide-react';
import { 
  DELIVERY_OPTIONS, 
  PICKUP_LOCATIONS, 
  DELIVERY_ZONES,
  getDeliveryFee,
  getEstimatedDeliveryDate,
  type DeliveryOption,
  type PickupLocation
} from '@/lib/config/delivery';

interface DeliverySelectorProps {
  onDeliveryChange: (delivery: any) => void;
  selectedCurrency: 'EUR' | 'USD' | 'FCFA';
  cartTotal: number;
}

export function DeliverySelector({ onDeliveryChange, selectedCurrency, cartTotal }: DeliverySelectorProps) {
  const [selectedOption, setSelectedOption] = useState<string>('police-school-pickup');
  const [selectedZone, setSelectedZone] = useState<string>('yaounde');
  const [pickupLocation, setPickupLocation] = useState<string>('police-school-yaounde');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    region: '',
    postalCode: '',
    phone: '',
    instructions: ''
  });

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
    updateDeliveryInfo(optionId, selectedZone, pickupLocation, deliveryAddress);
  };

  const handleZoneChange = (zone: string) => {
    setSelectedZone(zone);
    updateDeliveryInfo(selectedOption, zone, pickupLocation, deliveryAddress);
  };

  const handlePickupLocationChange = (locationId: string) => {
    setPickupLocation(locationId);
    updateDeliveryInfo(selectedOption, selectedZone, locationId, deliveryAddress);
  };

  const handleAddressChange = (field: string, value: string) => {
    const newAddress = { ...deliveryAddress, [field]: value };
    setDeliveryAddress(newAddress);
    updateDeliveryInfo(selectedOption, selectedZone, pickupLocation, newAddress);
  };

  const updateDeliveryInfo = (
    optionId: string,
    zone: string,
    locationId: string,
    address: any
  ) => {
    const option = DELIVERY_OPTIONS.find(opt => opt.id === optionId);
    const location = PICKUP_LOCATIONS.find(loc => loc.id === locationId);
    const zoneInfo = DELIVERY_ZONES[zone as keyof typeof DELIVERY_ZONES];
    
    const deliveryFee = getDeliveryFee(zone, optionId);
    const estimatedDate = getEstimatedDeliveryDate(optionId, zone);

    onDeliveryChange({
      option,
      location,
      zone: zoneInfo,
      address: optionId === 'home-delivery' ? address : null,
      fee: deliveryFee,
      estimatedDate,
      total: cartTotal + deliveryFee
    });
  };

  const convertPrice = (price: number, currency: 'EUR' | 'USD' | 'FCFA') => {
    const rates = {
      EUR: 1,
      USD: 1.08,
      FCFA: 655.957
    };
    return price * rates[currency];
  };

  const formatPrice = (price: number, currency: 'EUR' | 'USD' | 'FCFA') => {
    const convertedPrice = convertPrice(price, currency);
    const symbols = { EUR: '€', USD: '$', FCFA: 'FCFA' };
    return `${symbols[currency]} ${convertedPrice.toFixed(2)}`;
  };

  const selectedDeliveryOption = DELIVERY_OPTIONS.find(opt => opt.id === selectedOption);
  const selectedPickupLocation = PICKUP_LOCATIONS.find(loc => loc.id === pickupLocation);
  const deliveryFee = getDeliveryFee(selectedZone, selectedOption);
  const estimatedDate = getEstimatedDeliveryDate(selectedOption, selectedZone);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Options de Livraison</h3>
        <Badge variant="secondary" className="ml-auto">
          Cameroun
        </Badge>
      </div>

      {/* Options de livraison */}
      <RadioGroup value={selectedOption} onValueChange={handleOptionChange}>
        <div className="grid gap-4">
          {DELIVERY_OPTIONS.map((option) => (
            <Card key={option.id} className={`cursor-pointer transition-all ${
              selectedOption === option.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor={option.id} className="text-base font-medium cursor-pointer">
                        {option.name}
                      </Label>
                      <div className="text-right">
                        <div className="font-semibold text-lg">
                          {option.price === 0 ? 'Gratuit' : formatPrice(option.price, selectedCurrency)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {option.estimatedDays}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                    
                    {option.restrictions && (
                      <div className="space-y-1">
                        {option.restrictions.map((restriction, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-orange-600">
                            <AlertCircle className="h-3 w-3" />
                            {restriction}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>

      {/* Sélection de zone pour livraison à domicile */}
      {selectedOption === 'home-delivery' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Adresse de Livraison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Zone de livraison</Label>
              <Select value={selectedZone} onValueChange={handleZoneChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre zone" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DELIVERY_ZONES).map(([key, zone]) => (
                    <SelectItem key={key} value={key}>
                      {zone.name} - {zone.estimatedDays}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Rue et numéro</Label>
                <Input
                  value={deliveryAddress.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  placeholder="123 Rue de la Paix"
                />
              </div>
              <div>
                <Label>Ville</Label>
                <Input
                  value={deliveryAddress.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="Yaoundé"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Région</Label>
                <Input
                  value={deliveryAddress.region}
                  onChange={(e) => handleAddressChange('region', e.target.value)}
                  placeholder="Centre"
                />
              </div>
              <div>
                <Label>Code postal</Label>
                <Input
                  value={deliveryAddress.postalCode}
                  onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                  placeholder="00000"
                />
              </div>
            </div>

            <div>
              <Label>Téléphone</Label>
              <Input
                value={deliveryAddress.phone}
                onChange={(e) => handleAddressChange('phone', e.target.value)}
                placeholder="+237 XXX XXX XXX"
              />
            </div>

            <div>
              <Label>Instructions de livraison (optionnel)</Label>
              <Textarea
                value={deliveryAddress.instructions}
                onChange={(e) => handleAddressChange('instructions', e.target.value)}
                placeholder="Instructions spéciales pour le livreur..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sélection du point de retrait */}
      {(selectedOption === 'police-school-pickup' || selectedOption === 'regional-pickup') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Point de Retrait
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={pickupLocation} onValueChange={handlePickupLocationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un point de retrait" />
              </SelectTrigger>
              <SelectContent>
                {PICKUP_LOCATIONS.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{location.name}</span>
                      <span className="text-sm text-gray-500">{location.address}, {location.city}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedPickupLocation && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium">{selectedPickupLocation.name}</h4>
                    <p className="text-sm text-gray-600">{selectedPickupLocation.address}</p>
                    <p className="text-sm text-gray-600">{selectedPickupLocation.city}, {selectedPickupLocation.region}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedPickupLocation.openingHours}
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="h-4 w-4" />
                        {selectedPickupLocation.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Résumé de la livraison */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold">Résumé de la Livraison</h4>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Option sélectionnée:</span>
              <span className="font-medium">{selectedDeliveryOption?.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Frais de livraison:</span>
              <span className="font-medium">
                {deliveryFee === 0 ? 'Gratuit' : formatPrice(deliveryFee, selectedCurrency)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Livraison estimée:</span>
              <span className="font-medium">
                {estimatedDate.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            {selectedPickupLocation && (
              <div className="flex justify-between">
                <span>Point de retrait:</span>
                <span className="font-medium">{selectedPickupLocation.name}</span>
              </div>
            )}
            
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-lg">
                  {formatPrice(cartTotal + deliveryFee, selectedCurrency)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations importantes */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-orange-600 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-medium text-orange-800 mb-2">Informations importantes</h4>
              <ul className="space-y-1 text-orange-700">
                <li>• Présence obligatoire lors de la livraison avec pièce d'identité</li>
                <li>• Paiement à la livraison accepté (Cash, Mobile Money, Carte)</li>
                <li>• Retrait gratuit à l'École de Police, Yaoundé</li>
                <li>• Livraison disponible dans tout le Cameroun</li>
                <li>• Service client disponible 7j/7</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 