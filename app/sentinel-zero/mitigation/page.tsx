'use client';

import { Vulnerability } from '@/lib/services/mitigation-service';
import { AlertTriangle, CheckCircle, Eye, FileText, Play, RotateCcw, Settings, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function MitigationPage() {
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);
  const [showIngestModal, setShowIngestModal] = useState(false);
  
  const {
    vulnerabilities,
    mitigations,
    stats,
    isLoading,
    error,
    applyMitigation,
    verifyMitigation,
    closeVulnerability,
    refreshData,
    ingestFindings
  } = useMitigation();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'text-red-500 bg-red-100';
      case 'MEDIUM': return 'text-yellow-500 bg-yellow-100';
      case 'LOW': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'text-red-500 bg-red-100';
      case 'MITIGATED': return 'text-yellow-500 bg-yellow-100';
      case 'VERIFIED': return 'text-blue-500 bg-blue-100';
      case 'CLOSED': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SQL_INJECTION': return '💉';
      case 'XSS': return '🎯';
      case 'WEAK_SSL': return '🔒';
      case 'CSRF': return '🔄';
      case 'DIRECTORY_TRAVERSAL': return '📁';
      default: return '⚠️';
    }
  };

  const handleApplyMitigation = async (vuln: Vulnerability) => {
    await applyMitigation(vuln);
  };

  const handleVerifyMitigation = async (vuln: Vulnerability) => {
    await verifyMitigation(vuln);
  };

  const handleCloseVulnerability = async (vuln: Vulnerability) => {
    await closeVulnerability(vuln);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Module de Mitigation</h1>
            <p className="text-gray-600 mt-2">Gestion automatique des vulnérabilités détectées</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
            <button
              onClick={() => setShowIngestModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Ingérer Findings
            </button>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">
                {stats.open}
              </div>
              <div className="text-sm text-gray-600">Vulnérabilités ouvertes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {stats.closed}
              </div>
              <div className="text-sm text-gray-600">Vulnérabilités fermées</div>
            </div>
          </div>
        </div>
        </div>

        {/* Gestion des erreurs */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Erreur</h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critiques</p>
                <p className="text-2xl font-bold text-red-600">
                  {vulnerabilities.filter(v => v.severity === 'HIGH').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Moyennes</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {vulnerabilities.filter(v => v.severity === 'MEDIUM').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mitigées</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.mitigated}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vérifiées</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.verified}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des vulnérabilités */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Vulnérabilités Détectées</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vulnérabilité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sévérité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localisation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CVSS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vulnerabilities.map((vuln) => (
                  <tr key={vuln.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getTypeIcon(vuln.type)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{vuln.type}</div>
                          <div className="text-sm text-gray-500">{vuln.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(vuln.severity)}`}>
                        {vuln.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vuln.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vuln.cvss}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vuln.status)}`}>
                        {vuln.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {vuln.status === 'OPEN' && (
                          <button
                            onClick={() => handleApplyMitigation(vuln)}
                            disabled={isLoading}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Mitiger
                          </button>
                        )}
                        
                        {vuln.status === 'MITIGATED' && (
                          <button
                            onClick={() => handleVerifyMitigation(vuln)}
                            disabled={isLoading}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Vérifier
                          </button>
                        )}
                        
                        {vuln.status === 'VERIFIED' && (
                          <button
                            onClick={() => handleCloseVulnerability(vuln)}
                            disabled={isLoading}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Fermer
                          </button>
                        )}
                        
                        <button
                          onClick={() => setSelectedVuln(vuln)}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Détails
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Journal des mitigations */}
        {mitigations.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mt-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Journal des Mitigations</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mitigations.map((mitigation) => (
                  <div key={mitigation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        mitigation.status === 'COMPLETED' ? 'bg-green-100' :
                        mitigation.status === 'RUNNING' ? 'bg-blue-100' :
                        mitigation.status === 'FAILED' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        {mitigation.status === 'COMPLETED' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : mitigation.status === 'RUNNING' ? (
                          <RotateCcw className="h-5 w-5 text-blue-600 animate-spin" />
                        ) : mitigation.status === 'FAILED' ? (
                          <XCircle className="h-5 w-5 text-red-600" />
                        ) : (
                          <Settings className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Mitigation {mitigation.vulnerabilityId}
                        </div>
                        <div className="text-sm text-gray-500">
                          {mitigation.action} - {mitigation.status}
                        </div>
                        {mitigation.result && (
                          <div className="text-sm text-gray-600 mt-1">
                            {mitigation.result}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(mitigation.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal de détails */}
        {selectedVuln && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Détails de la Vulnérabilité
                  </h3>
                  <button
                    onClick={() => setSelectedVuln(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedVuln.type}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sévérité</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedVuln.severity)}`}>
                      {selectedVuln.severity}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Localisation</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedVuln.location}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedVuln.description}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Score CVSS</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedVuln.cvss}</p>
                  </div>
                  
                  {selectedVuln.evidence && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preuve</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 p-2 rounded">
                        {selectedVuln.evidence}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedVuln.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal d'ingestion des findings */}
        {showIngestModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Ingérer de Nouveaux Findings
                  </h3>
                  <button
                    onClick={() => setShowIngestModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      JSON des Findings
                    </label>
                    <textarea
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      rows={10}
                      placeholder={`[
  {
    "type": "SQL_INJECTION",
    "severity": "HIGH",
    "location": "POST /api/auth/login",
    "description": "Vulnérabilité SQL injection détectée",
    "cvss": 8.8,
    "evidence": "Payload: admin' OR 1=1--"
  }
]`}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowIngestModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => {
                        // Ici tu peux implémenter la logique d'ingestion
                        setShowIngestModal(false);
                      }}
                      className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Ingérer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 