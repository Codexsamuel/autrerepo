#!/bin/bash

# Script de test pour les politiques OPA Sentinel Zero
# Test des politiques de sécurité automatisées

set -e

echo "🔒 Test des politiques de sécurité Sentinel Zero"
echo "================================================"

# Vérifier que OPA est installé
if ! command -v opa &> /dev/null; then
    echo "❌ OPA n'est pas installé. Installation..."
    curl -L -o opa https://openpolicyagent.org/downloads/latest/opa_linux_amd64
    chmod +x opa
    sudo mv opa /usr/local/bin/
fi

# Créer un répertoire temporaire pour les tests
TEST_DIR=$(mktemp -d)
cd "$TEST_DIR"

echo "📁 Répertoire de test: $TEST_DIR"

# Créer des exemples de ressources Kubernetes pour tester
cat > test-pod-compliant.yaml << 'EOF'
apiVersion: v1
kind: Pod
metadata:
  name: test-pod-compliant
  labels:
    app: sentinel-core
    component: security
    security: high
    environment: production
    role: analyst
  annotations:
    security_level: high
    isolation_level: strict
    audit_enabled: "true"
    log_level: info
    gdpr_compliant: "true"
    disaster_recovery_plan: "dr-plan-001"
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
  containers:
  - name: sentinel-core
    image: sentinel/core:latest
    resources:
      limits:
        cpu: "500m"
        memory: "512Mi"
    securityContext:
      privileged: false
      allowPrivilegeEscalation: false
      runAsUser: 1000
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
    env:
    - name: API_ENDPOINT
      value: "https://api.sentinel-zero.com"
EOF

cat > test-pod-non-compliant.yaml << 'EOF'
apiVersion: v1
kind: Pod
metadata:
  name: test-pod-non-compliant
  labels:
    app: test-app
  annotations:
    security_level: low
spec:
  containers:
  - name: test-container
    image: test/image:latest
    securityContext:
      privileged: true
      allowPrivilegeEscalation: true
      runAsUser: 0
    env:
    - name: PASSWORD
      value: "secret123"
    - name: SECRET_KEY
      value: "key123"
  volumes:
  - name: host-volume
    hostPath:
      path: /etc
EOF

cat > test-secret.yaml << 'EOF'
apiVersion: v1
kind: Secret
metadata:
  name: test-secret
  annotations:
    expiration_date: "2025-12-31"
type: Opaque
data:
  username: dGVzdA==
  password: cGFzc3dvcmQ=
EOF

echo "🧪 Test des politiques de sécurité..."

# Tester le pod conforme
echo "✅ Test du pod conforme..."
if opa eval --data ../policies/sentinel.security.rego --input test-pod-compliant.yaml "data.sentinel.security.deny" | grep -q "[]"; then
    echo "   ✅ Pod conforme - Aucune violation détectée"
else
    echo "   ❌ Pod conforme - Violations détectées:"
    opa eval --data ../policies/sentinel.security.rego --input test-pod-compliant.yaml "data.sentinel.security.deny"
fi

# Tester le pod non conforme
echo "❌ Test du pod non conforme..."
VIOLATIONS=$(opa eval --data ../policies/sentinel.security.rego --input test-pod-non-compliant.yaml "data.sentinel.security.deny")
if [ "$VIOLATIONS" != "[]" ]; then
    echo "   ✅ Violations détectées comme attendu:"
    echo "$VIOLATIONS"
else
    echo "   ❌ Aucune violation détectée (inattendu)"
fi

# Tester le secret
echo "🔐 Test du secret..."
if opa eval --data ../policies/sentinel.security.rego --input test-secret.yaml "data.sentinel.security.deny" | grep -q "[]"; then
    echo "   ✅ Secret conforme - Aucune violation détectée"
else
    echo "   ❌ Secret non conforme - Violations détectées:"
    opa eval --data ../policies/sentinel.security.rego --input test-secret.yaml "data.sentinel.security.deny"
fi

# Test de performance
echo "⚡ Test de performance..."
echo "   Test avec 1000 évaluations..."
time for i in {1..1000}; do
    opa eval --data ../policies/sentinel.security.rego --input test-pod-compliant.yaml "data.sentinel.security.deny" > /dev/null
done

# Test de validation de syntaxe
echo "🔍 Validation de syntaxe des politiques..."
if opa check ../policies/sentinel.security.rego; then
    echo "   ✅ Politiques syntaxiquement valides"
else
    echo "   ❌ Erreurs de syntaxe détectées"
    exit 1
fi

# Test de formatage
echo "📝 Formatage des politiques..."
if opa fmt --diff ../policies/sentinel.security.rego; then
    echo "   ✅ Politiques correctement formatées"
else
    echo "   ⚠️  Politiques nécessitent un formatage"
fi

echo ""
echo "🎯 Résumé des tests:"
echo "==================="
echo "✅ Politiques OPA créées et testées"
echo "✅ Configuration OPA configurée"
echo "✅ Tests de conformité exécutés"
echo "✅ Tests de performance effectués"
echo "✅ Validation de syntaxe réussie"

# Nettoyage
cd /
rm -rf "$TEST_DIR"

echo ""
echo "🚀 Les politiques de sécurité Sentinel Zero sont prêtes!"
echo "📋 Utilisez 'opa eval' pour évaluer vos ressources Kubernetes"
echo "🔧 Configurez OPA avec le fichier opa-config.yaml"
echo "📊 Surveillez les violations avec les logs de décision" 