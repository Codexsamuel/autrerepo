#!/bin/bash

# Script de déploiement OPA pour Sentinel Zero
# Déploiement des politiques de sécurité automatisées

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE="opa-system"
OPA_VERSION="latest"
SENTINEL_VERSION="1.0.0"

echo -e "${BLUE}🔒 Déploiement OPA Sentinel Zero${NC}"
echo "=========================================="
echo ""

# Vérifier les prérequis
echo -e "${YELLOW}📋 Vérification des prérequis...${NC}"

# Vérifier kubectl
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl n'est pas installé${NC}"
    exit 1
fi

# Vérifier la connexion Kubernetes
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}❌ Impossible de se connecter au cluster Kubernetes${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prérequis vérifiés${NC}"
echo ""

# Créer le namespace
echo -e "${YELLOW}🏗️  Création du namespace ${NAMESPACE}...${NC}"
kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
echo -e "${GREEN}✅ Namespace créé${NC}"
echo ""

# Créer les secrets nécessaires
echo -e "${YELLOW}🔐 Création des secrets...${NC}"

# Générer un token bearer
BEARER_TOKEN=$(openssl rand -hex 32)
BEARER_TOKEN_B64=$(echo -n "$BEARER_TOKEN" | base64)

# Créer le secret
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: opa-secrets
  namespace: ${NAMESPACE}
type: Opaque
data:
  bearer-token: ${BEARER_TOKEN_B64}
EOF

echo -e "${GREEN}✅ Secrets créés${NC}"
echo ""

# Déployer OPA
echo -e "${YELLOW}🚀 Déploiement d'OPA...${NC}"

# Appliquer les ConfigMaps
kubectl apply -f k8s/opa-configmap.yaml

# Appliquer le déploiement
kubectl apply -f k8s/opa-deployment.yaml

# Appliquer les webhooks d'admission
kubectl apply -f k8s/opa-admission.yaml

echo -e "${GREEN}✅ OPA déployé${NC}"
echo ""

# Attendre que les pods soient prêts
echo -e "${YELLOW}⏳ Attente du démarrage des pods...${NC}"
kubectl wait --for=condition=ready pod -l app=opa -n ${NAMESPACE} --timeout=300s
echo -e "${GREEN}✅ Pods OPA prêts${NC}"
echo ""

# Vérifier le statut
echo -e "${YELLOW}📊 Vérification du statut...${NC}"
kubectl get pods -n ${NAMESPACE}
echo ""

# Tester les politiques
echo -e "${YELLOW}🧪 Test des politiques de sécurité...${NC}"
cd test
./test-policies.sh
cd ..
echo ""

# Vérifier les webhooks
echo -e "${YELLOW}🔗 Vérification des webhooks d'admission...${NC}"
kubectl get validatingwebhookconfigurations | grep opa
kubectl get mutatingwebhookconfigurations | grep opa
echo ""

# Test d'intégration
echo -e "${YELLOW}🔍 Test d'intégration avec Kubernetes...${NC}"

# Créer un pod de test non conforme
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: test-pod-non-compliant
  namespace: default
spec:
  containers:
  - name: test
    image: nginx:latest
    securityContext:
      privileged: true
      runAsUser: 0
EOF

# Vérifier que le pod est rejeté
sleep 5
if kubectl get pod test-pod-non-compliant -n default &> /dev/null; then
    echo -e "${RED}❌ Le pod non conforme n'a pas été rejeté${NC}"
else
    echo -e "${GREEN}✅ Le pod non conforme a été rejeté comme attendu${NC}"
fi

# Nettoyer le test
kubectl delete pod test-pod-non-compliant -n default --ignore-not-found=true
echo ""

# Configuration des métriques
echo -e "${YELLOW}📈 Configuration des métriques...${NC}"
kubectl port-forward -n ${NAMESPACE} svc/opa 8181:8181 &
PORTPID=$!

sleep 5

# Tester l'API OPA
if curl -s http://localhost:8181/health &> /dev/null; then
    echo -e "${GREEN}✅ API OPA accessible${NC}"
else
    echo -e "${RED}❌ API OPA non accessible${NC}"
fi

# Arrêter le port-forward
kill $PORTPID 2>/dev/null || true
echo ""

# Affichage des informations de connexion
echo -e "${BLUE}🎯 Informations de connexion OPA:${NC}"
echo "=========================================="
echo "Namespace: ${NAMESPACE}"
echo "Service: opa.${NAMESPACE}.svc.cluster.local"
echo "Port HTTP: 8181"
echo "Port HTTPS: 8182"
echo "Port Métriques: 8183"
echo ""

# Commandes utiles
echo -e "${BLUE}🛠️  Commandes utiles:${NC}"
echo "========================"
echo "Voir les logs OPA:"
echo "  kubectl logs -f -l app=opa -n ${NAMESPACE}"
echo ""
echo "Tester une politique:"
echo "  kubectl create -f test-pod-non-compliant.yaml"
echo ""
echo "Vérifier les violations:"
echo "  kubectl get events --field-selector reason=FailedCreate"
echo ""
echo "Accéder à l'API OPA:"
echo "  kubectl port-forward -n ${NAMESPACE} svc/opa 8181:8181"
echo "  curl http://localhost:8181/health"
echo ""

# Vérification finale
echo -e "${YELLOW}🔍 Vérification finale...${NC}"
echo ""

# Vérifier que tous les composants sont déployés
COMPONENTS=("deployment/opa" "service/opa" "serviceaccount/opa" "clusterrole/opa-policy-enforcer" "clusterrolebinding/opa-policy-enforcer")
ALL_READY=true

for component in "${COMPONENTS[@]}"; do
    if kubectl get $component -n ${NAMESPACE} &> /dev/null; then
        echo -e "${GREEN}✅ $component déployé${NC}"
    else
        echo -e "${RED}❌ $component manquant${NC}"
        ALL_READY=false
    fi
done

echo ""

if [ "$ALL_READY" = true ]; then
    echo -e "${GREEN}🎉 Déploiement OPA Sentinel Zero terminé avec succès!${NC}"
    echo ""
    echo -e "${BLUE}Les politiques de sécurité sont maintenant actives et surveillent:${NC}"
    echo "• Tous les déploiements de pods"
    echo "• Les services et secrets"
    echo "• Les configurations de sécurité"
    echo "• La conformité GDPR et ISO27001"
    echo "• Les vulnérabilités et violations"
    echo ""
    echo -e "${YELLOW}⚠️  N'oubliez pas de:${NC}"
    echo "• Configurer les alertes de sécurité"
    echo "• Tester régulièrement les politiques"
    echo "• Mettre à jour les politiques selon vos besoins"
    echo "• Surveiller les logs et métriques"
else
    echo -e "${RED}❌ Déploiement incomplet. Vérifiez les composants manquants.${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "=================="
echo "README: sentinel-zero/backend/opa/README.md"
echo "Politiques: sentinel-zero/backend/opa/policies/"
echo "Tests: sentinel-zero/backend/opa/test/"
echo "K8s: sentinel-zero/backend/opa/k8s/" 