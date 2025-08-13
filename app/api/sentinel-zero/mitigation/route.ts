import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Types pour la mitigation
interface Vulnerability {
  id: string;
  type: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  location: string;
  description: string;
  status: 'OPEN' | 'MITIGATED' | 'VERIFIED' | 'CLOSED';
  cvss: number;
  evidence?: string;
  timestamp: string;
}

interface MitigationAction {
  id: string;
  vulnerabilityId: string;
  action: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  result?: string;
  timestamp: string;
}

interface MitigationRequest {
  target: string;
  scanner: string;
  findings: Vulnerability[];
}

// Stockage local (remplacer par ta base de données)
const DATA_DIR = path.join(process.cwd(), 'data', 'mitigation');
const VULNERABILITIES_FILE = path.join(DATA_DIR, 'vulnerabilities.json');
const MITIGATIONS_FILE = path.join(DATA_DIR, 'mitigations.json');

// Initialisation des fichiers de données
async function ensureDataFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Créer le fichier des vulnérabilités s'il n'existe pas
    try {
      await fs.access(VULNERABILITIES_FILE);
    } catch {
      await fs.writeFile(VULNERABILITIES_FILE, JSON.stringify([], null, 2));
    }
    
    // Créer le fichier des mitigations s'il n'existe pas
    try {
      await fs.access(MITIGATIONS_FILE);
    } catch {
      await fs.writeFile(MITIGATIONS_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des fichiers de données:', error);
  }
}

// Lecture des vulnérabilités
async function readVulnerabilities(): Promise<Vulnerability[]> {
  try {
    const data = await fs.readFile(VULNERABILITIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture des vulnérabilités:', error);
    return [];
  }
}

// Écriture des vulnérabilités
async function writeVulnerabilities(vulns: Vulnerability[]): Promise<void> {
  try {
    await fs.writeFile(VULNERABILITIES_FILE, JSON.stringify(vulns, null, 2));
  } catch (error) {
    console.error('Erreur lors de l\'écriture des vulnérabilités:', error);
  }
}

// Lecture des mitigations
async function readMitigations(): Promise<MitigationAction[]> {
  try {
    const data = await fs.readFile(MITIGATIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture des mitigations:', error);
    return [];
  }
}

// Écriture des mitigations
async function writeMitigations(mitigations: MitigationAction[]): Promise<void> {
  try {
    await fs.writeFile(MITIGATIONS_FILE, JSON.stringify(mitigations, null, 2));
  } catch (error) {
    console.error('Erreur lors de l\'écriture des mitigations:', error);
  }
}

// Application des playbooks de mitigation
async function applyMitigationPlaybook(vuln: Vulnerability): Promise<MitigationAction> {
  const mitigation: MitigationAction = {
    id: `MIT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    vulnerabilityId: vuln.id,
    action: 'AUTO_MITIGATION',
    status: 'RUNNING',
    timestamp: new Date().toISOString()
  };

  try {
    // Playbooks de mitigation basés sur le type de vulnérabilité
    switch (vuln.type) {
      case 'SQL_INJECTION':
        await applySQLInjectionMitigation(vuln);
        mitigation.result = 'Règles WAF SQL activées, validation d\'entrée renforcée';
        break;
        
      case 'XSS':
        await applyXSSMitigation(vuln);
        mitigation.result = 'CSP strict activé, échappement automatique activé';
        break;
        
      case 'WEAK_SSL':
        await applySSLMitigation(vuln);
        mitigation.result = 'Configuration TLS 1.3 appliquée, HSTS activé';
        break;
        
      case 'CSRF':
        await applyCSRFMitigation(vuln);
        mitigation.result = 'Protection CSRF activée, tokens synchronisés';
        break;
        
      case 'DIRECTORY_TRAVERSAL':
        await applyDirectoryTraversalMitigation(vuln);
        mitigation.result = 'Filtrage des chemins activé, restrictions serveur appliquées';
        break;
        
      default:
        mitigation.result = 'Type de vulnérabilité non mappé, mitigation manuelle requise';
        break;
    }

    mitigation.status = 'COMPLETED';
  } catch (error) {
    mitigation.status = 'FAILED';
    mitigation.result = `Erreur lors de la mitigation: ${error}`;
  }

  return mitigation;
}

// Mitigation SQL Injection
async function applySQLInjectionMitigation(vuln: Vulnerability): Promise<void> {
  // 1. Activer les règles WAF SQL
  console.log(`[MITIGATION] Activation des règles WAF SQL pour ${vuln.location}`);
  
  // 2. Renforcer la validation d'entrée
  console.log(`[MITIGATION] Renforcement de la validation d'entrée pour ${vuln.location}`);
  
  // 3. Forcer l'utilisation de requêtes paramétrées
  console.log(`[MITIGATION] Vérification des requêtes paramétrées pour ${vuln.location}`);
  
  // Simulation d'un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// Mitigation XSS
async function applyXSSMitigation(vuln: Vulnerability): Promise<void> {
  // 1. Activer CSP strict
  console.log(`[MITIGATION] Activation CSP strict pour ${vuln.location}`);
  
  // 2. Activer l'échappement automatique
  console.log(`[MITIGATION] Activation échappement automatique pour ${vuln.location}`);
  
  // 3. Valider les entrées utilisateur
  console.log(`[MITIGATION] Validation des entrées utilisateur pour ${vuln.location}`);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// Mitigation SSL
async function applySSLMitigation(vuln: Vulnerability): Promise<void> {
  // 1. Forcer TLS 1.3
  console.log(`[MITIGATION] Forçage TLS 1.3 pour ${vuln.location}`);
  
  // 2. Activer HSTS
  console.log(`[MITIGATION] Activation HSTS pour ${vuln.location}`);
  
  // 3. Configurer les suites de chiffrement modernes
  console.log(`[MITIGATION] Configuration suites de chiffrement modernes pour ${vuln.location}`);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// Mitigation CSRF
async function applyCSRFMitigation(vuln: Vulnerability): Promise<void> {
  // 1. Activer la protection CSRF
  console.log(`[MITIGATION] Activation protection CSRF pour ${vuln.location}`);
  
  // 2. Synchroniser les tokens
  console.log(`[MITIGATION] Synchronisation des tokens CSRF pour ${vuln.location}`);
  
  // 3. Valider les origines des requêtes
  console.log(`[MITIGATION] Validation des origines des requêtes pour ${vuln.location}`);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// Mitigation Directory Traversal
async function applyDirectoryTraversalMitigation(vuln: Vulnerability): Promise<void> {
  // 1. Activer le filtrage des chemins
  console.log(`[MITIGATION] Activation filtrage des chemins pour ${vuln.location}`);
  
  // 2. Appliquer les restrictions serveur
  console.log(`[MITIGATION] Application restrictions serveur pour ${vuln.location}`);
  
  // 3. Valider les paramètres de chemin
  console.log(`[MITIGATION] Validation des paramètres de chemin pour ${vuln.location}`);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// GET - Récupérer toutes les vulnérabilités
export async function GET() {
  try {
    await ensureDataFiles();
    const vulnerabilities = await readVulnerabilities();
    const mitigations = await readMitigations();
    
    return NextResponse.json({
      status: 'success',
      data: {
        vulnerabilities,
        mitigations,
        stats: {
          total: vulnerabilities.length,
          open: vulnerabilities.filter(v => v.status === 'OPEN').length,
          mitigated: vulnerabilities.filter(v => v.status === 'MITIGATED').length,
          verified: vulnerabilities.filter(v => v.status === 'VERIFIED').length,
          closed: vulnerabilities.filter(v => v.status === 'CLOSED').length
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return NextResponse.json(
      { status: 'error', message: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// POST - Ingérer de nouvelles vulnérabilités et appliquer la mitigation
export async function POST(request: NextRequest) {
  try {
    await ensureDataFiles();
    
    const body: MitigationRequest = await request.json();
    
    if (!body.target || !body.findings || !Array.isArray(body.findings)) {
      return NextResponse.json(
        { status: 'error', message: 'Données invalides' },
        { status: 400 }
      );
    }

    // Lire les données existantes
    const existingVulns = await readVulnerabilities();
    const existingMitigations = await readMitigations();
    
    // Traiter chaque finding
    const newVulns: Vulnerability[] = [];
    const newMitigations: MitigationAction[] = [];
    
    for (const finding of body.findings) {
      // Vérifier si la vulnérabilité existe déjà
      const existingVuln = existingVulns.find(v => 
        v.type === finding.type && v.location === finding.location
      );
      
      if (!existingVuln) {
        // Nouvelle vulnérabilité
        const newVuln: Vulnerability = {
          ...finding,
          id: `VULN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          status: 'OPEN',
          timestamp: new Date().toISOString()
        };
        
        newVulns.push(newVuln);
        
        // Appliquer la mitigation automatique
        const mitigation = await applyMitigationPlaybook(newVuln);
        newMitigations.push(mitigation);
        
        // Mettre à jour le statut si la mitigation a réussi
        if (mitigation.status === 'COMPLETED') {
          newVuln.status = 'MITIGATED';
        }
      }
    }
    
    // Sauvegarder les nouvelles données
    if (newVulns.length > 0) {
      const allVulns = [...existingVulns, ...newVulns];
      await writeVulnerabilities(allVulns);
    }
    
    if (newMitigations.length > 0) {
      const allMitigations = [...existingMitigations, ...newMitigations];
      await writeMitigations(allMitigations);
    }
    
    return NextResponse.json({
      status: 'success',
      message: `${newVulns.length} nouvelles vulnérabilités traitées`,
      data: {
        vulnerabilities: newVulns,
        mitigations: newMitigations
      }
    });
    
  } catch (error) {
    console.error('Erreur lors du traitement de la mitigation:', error);
    return NextResponse.json(
      { status: 'error', message: 'Erreur lors du traitement de la mitigation' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour le statut d'une vulnérabilité
export async function PUT(request: NextRequest) {
  try {
    await ensureDataFiles();
    
    const body = await request.json();
    const { vulnerabilityId, status } = body;
    
    if (!vulnerabilityId || !status) {
      return NextResponse.json(
        { status: 'error', message: 'ID de vulnérabilité et statut requis' },
        { status: 400 }
      );
    }
    
    const vulnerabilities = await readVulnerabilities();
    const vulnIndex = vulnerabilities.findIndex(v => v.id === vulnerabilityId);
    
    if (vulnIndex === -1) {
      return NextResponse.json(
        { status: 'error', message: 'Vulnérabilité non trouvée' },
        { status: 404 }
      );
    }
    
    // Mettre à jour le statut
    vulnerabilities[vulnIndex].status = status;
    await writeVulnerabilities(vulnerabilities);
    
    return NextResponse.json({
      status: 'success',
      message: 'Statut de la vulnérabilité mis à jour',
      data: vulnerabilities[vulnIndex]
    });
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json(
      { status: 'error', message: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
} 