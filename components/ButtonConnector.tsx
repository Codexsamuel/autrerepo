'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ButtonConnectorProps {
  action: 'contact' | 'enrollment' | 'download' | 'demo' | 'consultation' | 'callback';
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
  className?: string;
  data?: any;
}

export function ButtonConnector({ 
  action, 
  variant = 'default', 
  size = 'default', 
  children, 
  className = '',
  data = {}
}: ButtonConnectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: '',
    date: '',
    time: ''
  });

  const handleAction = () => {
    switch (action) {
      case 'contact':
        window.open('mailto:sobam@daveandlucesolutions.com?subject=Demande d\'information');
        break;
      case 'enrollment':
        setIsOpen(true);
        break;
      case 'download':
        // Simuler un téléchargement
        const link = document.createElement('a');
        link.href = '/documents/programme-formation.pdf';
        link.download = 'programme-formation.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
          title: "Téléchargement",
          description: "Le document a été téléchargé avec succès.",
        });
        break;
      case 'demo':
        window.open('/demo', '_blank');
        break;
      case 'consultation':
        setIsOpen(true);
        break;
      case 'callback':
        window.open('tel:+237694341586');
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Demande envoyée",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    });
    
    setIsOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      service: '',
      date: '',
      time: ''
    });
  };

  const getDialogContent = () => {
    switch (action) {
      case 'enrollment':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Inscription à la formation</DialogTitle>
              <DialogDescription>
                Remplissez ce formulaire pour vous inscrire à la formation. Nous vous recontacterons pour confirmer votre inscription.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Entreprise</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Précisez vos besoins ou questions..."
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  Envoyer ma demande
                </Button>
              </DialogFooter>
            </form>
          </>
        );
      
      case 'consultation':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Demande de consultation</DialogTitle>
              <DialogDescription>
                Planifiez une consultation gratuite avec nos experts pour évaluer vos besoins.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="service">Service d'intérêt</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formation">Formation</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="developpement">Développement</SelectItem>
                      <SelectItem value="marketing">Marketing Digital</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date souhaitée</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Heure souhaitée</Label>
                  <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une heure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="message">Description de votre projet</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Décrivez brièvement votre projet ou vos besoins..."
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  Demander une consultation
                </Button>
              </DialogFooter>
            </form>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleAction}
        className={className}
      >
        {children}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {getDialogContent()}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Composants spécialisés pour des actions courantes
export function ContactButton({ children, ...props }: any) {
  return (
    <ButtonConnector action="contact" {...props}>
      {children}
    </ButtonConnector>
  );
}

export function EnrollmentButton({ children, ...props }: any) {
  return (
    <ButtonConnector action="enrollment" {...props}>
      {children}
    </ButtonConnector>
  );
}

export function DownloadButton({ children, ...props }: any) {
  return (
    <ButtonConnector action="download" {...props}>
      {children}
    </ButtonConnector>
  );
}

export function DemoButton({ children, ...props }: any) {
  return (
    <ButtonConnector action="demo" {...props}>
      {children}
    </ButtonConnector>
  );
}

export function ConsultationButton({ children, ...props }: any) {
  return (
    <ButtonConnector action="consultation" {...props}>
      {children}
    </ButtonConnector>
  );
}

export function CallbackButton({ children, ...props }: any) {
  return (
    <ButtonConnector action="callback" {...props}>
      {children}
    </ButtonConnector>
  );
} 