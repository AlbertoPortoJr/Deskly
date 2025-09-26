#!/usr/bin/env node

/**
 * Script de Verificação de Dependências
 * Previne internal server errors verificando imports e dependências
 */

const fs = require('fs');
const path = require('path');

// Dependências conhecidas do Radix UI
const RADIX_DEPENDENCIES = [
  '@radix-ui/react-slot',
  '@radix-ui/react-label',
  '@radix-ui/react-checkbox',
  '@radix-ui/react-select',
  '@radix-ui/react-dialog',
  '@radix-ui/react-separator',
  '@radix-ui/react-popover',
  '@radix-ui/react-tooltip',
  '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-accordion',
  '@radix-ui/react-alert-dialog',
  '@radix-ui/react-avatar',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-context-menu',
  '@radix-ui/react-hover-card',
  '@radix-ui/react-menubar',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-progress',
  '@radix-ui/react-radio-group',
  '@radix-ui/react-scroll-area',
  '@radix-ui/react-slider',
  '@radix-ui/react-switch',
  '@radix-ui/react-tabs',
  '@radix-ui/react-toast',
  '@radix-ui/react-toggle',
  '@radix-ui/react-toggle-group'
];

// Outras dependências essenciais
const ESSENTIAL_DEPENDENCIES = [
  'lucide-react',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'vaul'
];

function checkFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  
  const content = fs.readFileSync(filePath, 'utf8');
  const missingDeps = [];
  
  // Verificar imports do Radix UI
  RADIX_DEPENDENCIES.forEach(dep => {
    const importPattern = new RegExp(`from ['"]${dep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g');
    if (importPattern.test(content)) {
      // Verificar se a dependência está no package.json
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
        missingDeps.push(dep);
      }
    }
  });
  
  return missingDeps;
}

function scanDirectory(dir) {
  const missingDeps = new Set();
  
  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDir(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        const deps = checkFile(fullPath);
        deps.forEach(dep => missingDeps.add(dep));
      }
    });
  }
  
  scanDir(dir);
  return Array.from(missingDeps);
}

function main() {
  console.log('🔍 Verificando dependências...\n');
  
  const missingDeps = scanDirectory('app');
  
  if (missingDeps.length === 0) {
    console.log('✅ Todas as dependências estão instaladas!');
    return;
  }
  
  console.log('❌ Dependências faltantes encontradas:');
  missingDeps.forEach(dep => {
    console.log(`  - ${dep}`);
  });
  
  console.log('\n📦 Para instalar as dependências faltantes, execute:');
  console.log(`npm install ${missingDeps.join(' ')}`);
  
  process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { checkFile, scanDirectory };
