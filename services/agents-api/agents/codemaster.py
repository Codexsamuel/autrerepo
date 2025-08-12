import asyncio
import json
import logging
import re
import ast
import subprocess
import tempfile
from typing import Dict, List, Optional, Any, Tuple
from pathlib import Path
import hashlib
from datetime import datetime
from dataclasses import dataclass

@dataclass
class CodeIssue:
    line: int
    column: int
    severity: str  # 'error', 'warning', 'info'
    message: str
    rule_id: str
    category: str

@dataclass
class CodeReview:
    file_path: str
    language: str
    total_lines: int
    issues: List[CodeIssue]
    complexity_score: float
    maintainability_index: float
    security_score: float
    overall_score: float
    recommendations: List[str]

@dataclass
class TestResult:
    test_name: str
    status: str  # 'passed', 'failed', 'error'
    execution_time: float
    output: str
    error_message: Optional[str]

class CodeAnalyzer:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.language_patterns = {
            'python': r'\.py$',
            'javascript': r'\.(js|jsx)$',
            'typescript': r'\.(ts|tsx)$',
            'java': r'\.java$',
            'cpp': r'\.(cpp|cc|cxx)$',
            'c': r'\.c$'
        }
    
    def detect_language(self, file_path: str) -> str:
        """Détecte le langage de programmation basé sur l'extension"""
        for lang, pattern in self.language_patterns.items():
            if re.search(pattern, file_path, re.IGNORECASE):
                return lang
        return 'unknown'
    
    def analyze_python_code(self, code: str, file_path: str) -> CodeReview:
        """Analyse du code Python avec ast"""
        try:
            tree = ast.parse(code)
            issues = []
            
            # Analyse de complexité cyclomatique
            complexity = self._calculate_cyclomatic_complexity(tree)
            
            # Détection de problèmes courants
            issues.extend(self._detect_python_issues(tree))
            
            # Calcul des scores
            maintainability = self._calculate_maintainability_index(complexity, len(issues))
            security = self._calculate_security_score(issues)
            overall = self._calculate_overall_score(complexity, maintainability, security)
            
            # Génération de recommandations
            recommendations = self._generate_python_recommendations(issues, complexity)
            
            return CodeReview(
                file_path=file_path,
                language='python',
                total_lines=len(code.splitlines()),
                issues=issues,
                complexity_score=complexity,
                maintainability_index=maintainability,
                security_score=security,
                overall_score=overall,
                recommendations=recommendations
            )
            
        except SyntaxError as e:
            self.logger.error(f"Erreur de syntaxe Python: {e}")
            return CodeReview(
                file_path=file_path,
                language='python',
                total_lines=len(code.splitlines()),
                issues=[CodeIssue(e.lineno or 1, e.offset or 1, 'error', str(e), 'SYNTAX_ERROR', 'syntax')],
                complexity_score=0.0,
                maintainability_index=0.0,
                security_score=0.0,
                overall_score=0.0,
                recommendations=['Corriger les erreurs de syntaxe']
            )
        except Exception as e:
            self.logger.error(f"Erreur lors de l'analyse Python: {e}")
            return CodeReview(
                file_path=file_path,
                language='python',
                total_lines=len(code.splitlines()),
                issues=[CodeIssue(1, 1, 'error', f'Erreur d\'analyse: {e}', 'ANALYSIS_ERROR', 'analysis')],
                complexity_score=0.0,
                maintainability_index=0.0,
                security_score=0.0,
                overall_score=0.0,
                recommendations=['Vérifier la validité du code']
            )
    
    def _calculate_cyclomatic_complexity(self, tree: ast.AST) -> float:
        """Calcule la complexité cyclomatique"""
        complexity = 1  # Base complexity
        
        for node in ast.walk(tree):
            if isinstance(node, (ast.If, ast.While, ast.For, ast.AsyncFor)):
                complexity += 1
            elif isinstance(node, ast.ExceptHandler):
                complexity += 1
            elif isinstance(node, ast.And):
                complexity += 1
            elif isinstance(node, ast.Or):
                complexity += 1
        
        return complexity
    
    def _detect_python_issues(self, tree: ast.AST) -> List[CodeIssue]:
        """Détecte les problèmes courants en Python"""
        issues = []
        
        for node in ast.walk(tree):
            # Variables non utilisées
            if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store):
                if node.id.startswith('_'):
                    continue
                # Vérification simplifiée (en production, utilisez un analyseur plus sophistiqué)
            
            # Imports non utilisés
            if isinstance(node, ast.Import):
                for alias in node.names:
                    if alias.asname:
                        issues.append(CodeIssue(
                            node.lineno, node.col_offset, 'warning',
                            f'Import avec alias potentiellement inutile: {alias.name} as {alias.asname}',
                            'UNUSED_IMPORT', 'imports'
                        ))
            
            # Fonctions trop longues
            if isinstance(node, ast.FunctionDef):
                if len(node.body) > 20:  # Plus de 20 lignes
                    issues.append(CodeIssue(
                        node.lineno, node.col_offset, 'warning',
                        f'Fonction trop longue ({len(node.body)} lignes). Considérer la diviser.',
                        'LONG_FUNCTION', 'structure'
                    ))
            
            # Noms de variables trop courts
            if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store):
                if len(node.id) < 2 and not node.id.isupper():
                    issues.append(CodeIssue(
                        node.lineno, node.col_offset, 'info',
                        f'Nom de variable très court: {node.id}. Utiliser un nom plus descriptif.',
                        'SHORT_VARIABLE_NAME', 'naming'
                    ))
        
        return issues
    
    def _calculate_maintainability_index(self, complexity: float, issue_count: int) -> float:
        """Calcule l'index de maintenabilité (0-100)"""
        # Formule simplifiée basée sur la complexité et le nombre d'issues
        base_score = 100.0
        complexity_penalty = min(complexity * 5, 30)  # Max 30 points de pénalité
        issue_penalty = min(issue_count * 2, 20)     # Max 20 points de pénalité
        
        maintainability = base_score - complexity_penalty - issue_penalty
        return max(0.0, maintainability)
    
    def _calculate_security_score(self, issues: List[CodeIssue]) -> float:
        """Calcule le score de sécurité (0-100)"""
        security_issues = [i for i in issues if i.category == 'security']
        base_score = 100.0
        penalty_per_issue = 15.0
        
        security_score = base_score - (len(security_issues) * penalty_per_issue)
        return max(0.0, security_score)
    
    def _calculate_overall_score(self, complexity: float, maintainability: float, security: float) -> float:
        """Calcule le score global (0-100)"""
        # Pondération: maintenabilité 40%, sécurité 30%, complexité 30%
        complexity_score = max(0, 100 - (complexity * 10))  # Inverser la complexité
        
        overall = (maintainability * 0.4) + (security * 0.3) + (complexity_score * 0.3)
        return round(overall, 2)
    
    def _generate_python_recommendations(self, issues: List[CodeIssue], complexity: float) -> List[str]:
        """Génère des recommandations basées sur l'analyse"""
        recommendations = []
        
        if complexity > 10:
            recommendations.append("Considérer la refactorisation pour réduire la complexité cyclomatique")
        
        if complexity > 15:
            recommendations.append("Diviser les fonctions complexes en fonctions plus petites")
        
        issue_categories = [i.category for i in issues]
        if 'naming' in issue_categories:
            recommendations.append("Améliorer la convention de nommage des variables et fonctions")
        
        if 'structure' in issue_categories:
            recommendations.append("Restructurer le code pour améliorer la lisibilité")
        
        if 'imports' in issue_categories:
            recommendations.append("Nettoyer les imports inutilisés")
        
        if not recommendations:
            recommendations.append("Code bien structuré, continuer dans cette direction")
        
        return recommendations

class TestGenerator:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    def generate_python_tests(self, code: str, file_path: str) -> str:
        """Génère des tests unitaires Python basiques"""
        try:
            # Analyse du code pour identifier les fonctions
            tree = ast.parse(code)
            functions = []
            
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef):
                    functions.append({
                        'name': node.name,
                        'args': [arg.arg for arg in node.args.args],
                        'lineno': node.lineno
                    })
            
            if not functions:
                return "# Aucune fonction trouvée pour générer des tests"
            
            # Génération des tests
            test_code = f"""# Tests générés automatiquement pour {file_path}
import unittest
import sys
import os

# Ajouter le répertoire parent au path pour importer le module
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class Test{Path(file_path).stem.capitalize()}(unittest.TestCase):
    def setUp(self):
        # Configuration des tests
        pass
    
    def tearDown(self):
        # Nettoyage après les tests
        pass
"""
            
            for func in functions:
                test_code += f"""
    def test_{func['name']}(self):
        # Test pour la fonction {func['name']}
        # TODO: Implémenter des tests spécifiques
        # Exemple:
        # result = {func['name']}(*args)
        # self.assertIsNotNone(result)
        pass
"""
            
            test_code += """
if __name__ == '__main__':
    unittest.main()
"""
            
            return test_code
            
        except Exception as e:
            self.logger.error(f"Erreur lors de la génération des tests: {e}")
            return f"# Erreur lors de la génération des tests: {e}"

class TestRunner:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    async def run_python_tests(self, test_code: str, test_name: str = "generated_test") -> List[TestResult]:
        """Exécute les tests Python générés"""
        try:
            # Créer un fichier temporaire pour les tests
            with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
                f.write(test_code)
                temp_file = f.name
            
            # Exécuter les tests
            result = subprocess.run(
                [sys.executable, '-m', 'pytest', temp_file, '-v'],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            # Nettoyer le fichier temporaire
            os.unlink(temp_file)
            
            # Analyser les résultats
            test_results = []
            
            if result.returncode == 0:
                test_results.append(TestResult(
                    test_name=test_name,
                    status='passed',
                    execution_time=0.0,  # Pas de mesure de temps précise
                    output=result.stdout,
                    error_message=None
                ))
            else:
                test_results.append(TestResult(
                    test_name=test_name,
                    status='failed',
                    execution_time=0.0,
                    output=result.stdout,
                    error_message=result.stderr
                ))
            
            return test_results
            
        except subprocess.TimeoutExpired:
            return [TestResult(
                test_name=test_name,
                status='error',
                execution_time=30.0,
                output='',
                error_message='Timeout lors de l\'exécution des tests'
            )]
        except Exception as e:
            self.logger.error(f"Erreur lors de l'exécution des tests: {e}")
            return [TestResult(
                test_name=test_name,
                status='error',
                execution_time=0.0,
                output='',
                error_message=str(e)
            )]

class CodeMasterAgent:
    def __init__(self):
        self.analyzer = CodeAnalyzer()
        self.test_generator = TestGenerator()
        self.test_runner = TestRunner()
        self.logger = logging.getLogger(__name__)
        self.review_cache = {}
    
    async def review_code(self, code: str, file_path: str, language: str = None) -> CodeReview:
        """Analyse complète du code"""
        try:
            # Détecter le langage si non spécifié
            if not language:
                language = self.analyzer.detect_language(file_path)
            
            # Vérifier le cache
            cache_key = hashlib.md5(f"{code}:{file_path}".encode()).hexdigest()
            if cache_key in self.review_cache:
                return self.review_cache[cache_key]
            
            # Analyser selon le langage
            if language == 'python':
                review = self.analyzer.analyze_python_code(code, file_path)
            else:
                # Support pour d'autres langages (à implémenter)
                review = CodeReview(
                    file_path=file_path,
                    language=language,
                    total_lines=len(code.splitlines()),
                    issues=[],
                    complexity_score=0.0,
                    maintainability_index=0.0,
                    security_score=0.0,
                    overall_score=0.0,
                    recommendations=[f'Support pour {language} non encore implémenté']
                )
            
            # Mettre en cache
            self.review_cache[cache_key] = review
            
            return review
            
        except Exception as e:
            self.logger.error(f"Erreur lors de la review: {e}")
            return CodeReview(
                file_path=file_path,
                language=language or 'unknown',
                total_lines=len(code.splitlines()),
                issues=[CodeIssue(1, 1, 'error', f'Erreur d\'analyse: {e}', 'REVIEW_ERROR', 'analysis')],
                complexity_score=0.0,
                maintainability_index=0.0,
                security_score=0.0,
                overall_score=0.0,
                recommendations=['Vérifier la validité du code et réessayer']
            )
    
    async def generate_tests(self, code: str, file_path: str) -> str:
        """Génère des tests pour le code"""
        try:
            language = self.analyzer.detect_language(file_path)
            
            if language == 'python':
                return self.test_generator.generate_python_tests(code, file_path)
            else:
                return f"# Génération de tests pour {language} non encore supportée"
                
        except Exception as e:
            self.logger.error(f"Erreur lors de la génération des tests: {e}")
            return f"# Erreur lors de la génération des tests: {e}"
    
    async def run_tests(self, test_code: str, test_name: str = "generated_test") -> List[TestResult]:
        """Exécute les tests générés"""
        try:
            return await self.test_runner.run_python_tests(test_code, test_name)
        except Exception as e:
            self.logger.error(f"Erreur lors de l'exécution des tests: {e}")
            return [TestResult(
                test_name=test_name,
                status='error',
                execution_time=0.0,
                output='',
                error_message=str(e)
            )]
    
    async def suggest_improvements(self, code: str, file_path: str) -> Dict[str, Any]:
        """Suggère des améliorations pour le code"""
        try:
            # Analyser le code
            review = await self.review_code(code, file_path)
            
            # Générer des suggestions détaillées
            suggestions = {
                'overall_score': review.overall_score,
                'priority_issues': [],
                'quick_wins': [],
                'long_term_improvements': [],
                'security_concerns': [],
                'performance_tips': []
            }
            
            # Catégoriser les suggestions
            for issue in review.issues:
                if issue.severity == 'error':
                    suggestions['priority_issues'].append({
                        'line': issue.line,
                        'message': issue.message,
                        'fix': self._suggest_fix(issue)
                    })
                elif issue.severity == 'warning':
                    suggestions['quick_wins'].append({
                        'line': issue.line,
                        'message': issue.message,
                        'fix': self._suggest_fix(issue)
                    })
                elif issue.category == 'security':
                    suggestions['security_concerns'].append({
                        'line': issue.line,
                        'message': issue.message,
                        'risk_level': 'medium'
                    })
            
            # Suggestions de performance
            if review.complexity_score > 10:
                suggestions['performance_tips'].append({
                    'type': 'complexity',
                    'message': 'Réduire la complexité cyclomatique',
                    'impact': 'high'
                })
            
            if review.maintainability_index < 50:
                suggestions['long_term_improvements'].append({
                    'type': 'maintainability',
                    'message': 'Améliorer la maintenabilité du code',
                    'impact': 'medium'
                })
            
            return suggestions
            
        except Exception as e:
            self.logger.error(f"Erreur lors de la génération des suggestions: {e}")
            return {'error': str(e)}
    
    def _suggest_fix(self, issue: CodeIssue) -> str:
        """Suggère une correction pour un problème"""
        if issue.rule_id == 'LONG_FUNCTION':
            return "Diviser la fonction en plusieurs fonctions plus petites et plus focalisées"
        elif issue.rule_id == 'SHORT_VARIABLE_NAME':
            return "Utiliser un nom de variable plus descriptif qui explique son contenu"
        elif issue.rule_id == 'UNUSED_IMPORT':
            return "Supprimer l'import s'il n'est pas utilisé, ou l'utiliser dans le code"
        else:
            return "Vérifier la documentation du langage pour les bonnes pratiques"
    
    def get_cache_stats(self) -> Dict[str, Any]:
        """Retourne les statistiques du cache"""
        return {
            'total_cached': len(self.review_cache),
            'cache_size_mb': sum(len(str(v)) for v in self.review_cache.values()) / 1024 / 1024
        }
    
    def clear_cache(self):
        """Vide le cache"""
        self.review_cache.clear()
        self.logger.info("Cache de review vidé")

# Instance globale de l'agent
code_master = CodeMasterAgent() 