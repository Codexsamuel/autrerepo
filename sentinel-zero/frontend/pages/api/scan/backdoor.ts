import { NextApiRequest, NextApiResponse } from 'next';

interface BackdoorScanRequest {
  target: string;
  scan_type: string;
  duration: number;
}

interface BackdoorFinding {
  type: string;
  signature?: string;
  pattern?: string;
  matches?: any[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  content?: string;
  decoded_preview?: string;
}

interface ScanResult {
  scan_id: string;
  target: string;
  scan_type: string;
  timestamp: string;
  findings: BackdoorFinding[];
  summary: {
    total_findings: number;
    high_severity: number;
    medium_severity: number;
    low_severity: number;
  };
  status: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { target, scan_type, duration }: BackdoorScanRequest = req.body;

    if (!target) {
      return res.status(400).json({ error: 'Target is required' });
    }

    const scanResult: ScanResult = await simulateBackdoorScan(target, scan_type);

    return res.status(200).json({
      scan_id: scanResult.scan_id,
      status: 'completed',
      findings_count: scanResult.findings.length,
      results: scanResult
    });

  } catch (error) {
    console.error('Error in backdoor scan:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function simulateBackdoorScan(target: string, scanType: string): Promise<ScanResult> {
  const scanId = `backdoor_${Date.now()}`;
  const findings: BackdoorFinding[] = [];

  const suspiciousPatterns = [
    {
      type: 'known_signature',
      signature: 'eval($_POST',
      severity: 'high' as const,
      description: 'Signature de porte dérobée PHP détectée: eval($_POST'
    },
    {
      type: 'pattern_detected',
      pattern: 'PHP_Base64_Backdoor',
      severity: 'medium' as const,
      description: 'Code PHP encodé en base64 détecté'
    },
    {
      type: 'suspicious_file',
      severity: 'high' as const,
      description: 'Fichier suspect détecté: shell.php'
    }
  ];

  const randomFindings = Math.floor(Math.random() * 3);
  for (let i = 0; i < randomFindings; i++) {
    findings.push(suspiciousPatterns[i]);
  }

  const summary = {
    total_findings: findings.length,
    high_severity: findings.filter(f => f.severity === 'high').length,
    medium_severity: findings.filter(f => f.severity === 'medium').length,
    low_severity: findings.filter(f => f.severity === 'low').length
  };

  return {
    scan_id: scanId,
    target,
    scan_type: scanType,
    timestamp: new Date().toISOString(),
    findings,
    summary,
    status: 'completed'
  };
}
