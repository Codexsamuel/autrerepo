const fs = require('fs');
const path = require('path');

// Fonction pour lire récursivement tous les fichiers
function findFiles(dir, pattern) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findFiles(fullPath, pattern));
    } else if (pattern.test(fullPath)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Fonction pour extraire le nom du composant du contenu
function extractComponentName(content) {
  const match = content.match(/export default function (\w+)/);
  return match ? match[1] : 'Page';
}

// Fonction pour créer le composant client
function createClientComponent(content, componentName, id) {
  // Supprimer "use client" et les imports de useParams
  let clientContent = content
    .replace(/"use client";?\s*/, '')
    .replace(/'use client';?\s*/, '')
    .replace(/import.*useParams.*from.*next\/navigation.*\n?/g, '')
    .replace(/const params = useParams\(\);\s*const id = params\?\.id as string;\s*/g, '')
    .replace(/const \{ id \} = params as \{ id: string \};\s*/g, '');
  
  // Ajouter l'interface pour les props
  const interfaceMatch = clientContent.match(/interface (\w+)/);
  if (!interfaceMatch) {
    clientContent = clientContent.replace(
      /export default function (\w+)/,
      `interface ${componentName}ClientProps {
  id: string;
}

export default function ${componentName}Client({ id }: ${componentName}ClientProps)`
    );
  } else {
    clientContent = clientContent.replace(
      /export default function (\w+)/,
      `export default function ${componentName}Client({ id }: ${componentName}ClientProps)`
    );
  }
  
  // Ajouter "use client" au début
  clientContent = '"use client";\n\n' + clientContent;
  
  return clientContent;
}

// Fonction pour créer la page serveur
function createServerPage(componentName) {
  return `import ${componentName}Client from './${componentName}Client';

// Fonction requise pour l'export statique Next.js
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

export default async function ${componentName}Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <${componentName}Client id={id} />;
}`;
}

// Fonction principale
function fixDynamicPages() {
  const appDir = path.join(__dirname, '..', 'app');
  const dynamicPages = findFiles(appDir, /\[.*\]\/page\.tsx$/);
  
  console.log(`Found ${dynamicPages.length} dynamic pages`);
  
  for (const pagePath of dynamicPages) {
    try {
      const content = fs.readFileSync(pagePath, 'utf8');
      
      // Vérifier si la page a "use client" et "generateStaticParams"
      if (content.includes('use client') && content.includes('generateStaticParams')) {
        console.log(`Fixing: ${pagePath}`);
        
        const componentName = extractComponentName(content);
        const clientComponentContent = createClientComponent(content, componentName);
        const serverPageContent = createServerPage(componentName);
        
        // Créer le fichier client
        const clientPath = pagePath.replace('/page.tsx', `/${componentName}Client.tsx`);
        fs.writeFileSync(clientPath, clientComponentContent);
        
        // Remplacer le contenu de la page
        fs.writeFileSync(pagePath, serverPageContent);
        
        console.log(`  ✓ Created: ${clientPath}`);
        console.log(`  ✓ Updated: ${pagePath}`);
      }
    } catch (error) {
      console.error(`Error processing ${pagePath}:`, error.message);
    }
  }
}

// Exécuter le script
fixDynamicPages(); 