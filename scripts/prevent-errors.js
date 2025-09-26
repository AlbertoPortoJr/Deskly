#!/usr/bin/env node

/**
 * Sistema de Prevenção de Erros
 * Verifica e corrige problemas comuns que causam internal server errors
 */

const fs = require('fs');
const path = require('path');

// Configurações de verificação
const CONFIG = {
  // Extensões de arquivo para verificar
  fileExtensions: ['.tsx', '.ts', '.jsx', '.js'],
  
  // Padrões problemáticos
  problematicPatterns: [
    // Imports de dependências não instaladas
    {
      pattern: /from ['"]@radix-ui\/react-([^'"]+)['"]/g,
      type: 'missing-dependency',
      fix: (match, dep) => `npm install @radix-ui/react-${dep}`
    },
    // Imports relativos incorretos
    {
      pattern: /from ['"]\.\.\/\.\.\/components\//g,
      type: 'incorrect-import',
      fix: () => 'Verificar caminho do import'
    },
    // Componentes sem 'use client'
    {
      pattern: /export default function.*\n.*useState|useEffect|onClick/g,
      type: 'missing-client-directive',
      fix: () => "Adicionar 'use client' no topo do arquivo"
    }
  ],
  
  // Dependências essenciais
  essentialDependencies: [
    '@radix-ui/react-slot',
    '@radix-ui/react-label',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-select',
    '@radix-ui/react-dialog',
    '@radix-ui/react-separator',
    'lucide-react',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    'vaul'
  ]
};

function checkFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  CONFIG.problematicPatterns.forEach(({ pattern, type, fix }) => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        issues.push({
          file: filePath,
          type,
          match,
          fix: fix(match),
          line: content.substring(0, content.indexOf(match)).split('\n').length
        });
      });
    }
  });
  
  return issues;
}

function scanDirectory(dir) {
  const issues = [];
  
  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDir(fullPath);
      } else if (CONFIG.fileExtensions.some(ext => item.endsWith(ext))) {
        const fileIssues = checkFile(fullPath);
        issues.push(...fileIssues);
      }
    });
  }
  
  scanDir(dir);
  return issues;
}

function checkDependencies() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const missingDeps = CONFIG.essentialDependencies.filter(dep => 
    !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
  );
  
  return missingDeps;
}

function generateReport(issues, missingDeps) {
  console.log('🔍 Relatório de Verificação de Erros\n');
  
  if (issues.length === 0 && missingDeps.length === 0) {
    console.log('✅ Nenhum problema encontrado!');
    return;
  }
  
  if (missingDeps.length > 0) {
    console.log('📦 Dependências faltantes:');
    missingDeps.forEach(dep => console.log(`  - ${dep}`));
    console.log(`\n💡 Para instalar: npm install ${missingDeps.join(' ')}\n`);
  }
  
  if (issues.length > 0) {
    console.log('⚠️ Problemas encontrados:');
    issues.forEach(issue => {
      console.log(`\n📄 ${issue.file}:${issue.line}`);
      console.log(`   Tipo: ${issue.type}`);
      console.log(`   Match: ${issue.match}`);
      console.log(`   Solução: ${issue.fix}`);
    });
  }
}

function main() {
  console.log('🛡️ Sistema de Prevenção de Erros\n');
  
  // Verificar dependências
  const missingDeps = checkDependencies();
  
  // Verificar arquivos
  const issues = scanDirectory('app');
  
  // Gerar relatório
  generateReport(issues, missingDeps);
  
  if (missingDeps.length > 0 || issues.length > 0) {
    console.log('\n🚨 Problemas encontrados! Execute as correções antes do build.');
    process.exit(1);
  }
  
  console.log('\n🎉 Projeto pronto para build!');
}

if (require.main === module) {
  main();
}

module.exports = { checkFile, scanDirectory, checkDependencies };
