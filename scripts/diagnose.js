#!/usr/bin/env node

/**
 * Diagnóstico de Problemas
 * Identifica e corrige problemas que causam internal server errors
 */

const fs = require('fs');
const path = require('path');

function checkFileStructure() {
  console.log('🔍 Verificando estrutura de arquivos...\n');
  
  const requiredFiles = [
    'app/layout.tsx',
    'app/page.tsx',
    'app/globals.css',
    'package.json',
    'next.config.ts',
    'tsconfig.json'
  ];
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    console.log('❌ Arquivos essenciais faltando:');
    missingFiles.forEach(file => console.log(`  - ${file}`));
    return false;
  }
  
  console.log('✅ Estrutura de arquivos OK');
  return true;
}

function checkImports() {
  console.log('\n🔍 Verificando imports...\n');
  
  const problematicImports = [];
  
  function scanFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Verificar imports problemáticos
      if (line.includes('from "@/') && !line.includes('@/lib/utils')) {
        const match = line.match(/from ["']@\/([^"']+)["']/);
        if (match) {
          const importPath = match[1];
          const fullPath = `app/${importPath}`;
          
          if (!fs.existsSync(`${fullPath}.ts`) && !fs.existsSync(`${fullPath}.tsx`)) {
            problematicImports.push({
              file: filePath,
              line: index + 1,
              import: importPath,
              fullPath
            });
          }
        }
      }
    });
  }
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        scanFile(fullPath);
      }
    });
  }
  
  scanDirectory('app');
  
  if (problematicImports.length > 0) {
    console.log('❌ Imports problemáticos encontrados:');
    problematicImports.forEach(imp => {
      console.log(`  📄 ${imp.file}:${imp.line}`);
      console.log(`     Import: ${imp.import}`);
      console.log(`     Caminho: ${imp.fullPath}`);
    });
    return false;
  }
  
  console.log('✅ Imports OK');
  return true;
}

function checkDependencies() {
  console.log('\n🔍 Verificando dependências...\n');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    'next',
    'react',
    'react-dom',
    '@radix-ui/react-slot',
    'class-variance-authority',
    'clsx',
    'tailwind-merge'
  ];
  
  const missingDeps = requiredDeps.filter(dep => 
    !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
  );
  
  if (missingDeps.length > 0) {
    console.log('❌ Dependências faltando:');
    missingDeps.forEach(dep => console.log(`  - ${dep}`));
    return false;
  }
  
  console.log('✅ Dependências OK');
  return true;
}

function fixCommonIssues() {
  console.log('\n🔧 Corrigindo problemas comuns...\n');
  
  // Verificar se lib/utils.ts existe
  if (!fs.existsSync('lib/utils.ts')) {
    console.log('📝 Criando lib/utils.ts...');
    const libDir = 'lib';
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir);
    }
    
    const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;
    
    fs.writeFileSync('lib/utils.ts', utilsContent);
    console.log('✅ lib/utils.ts criado');
  }
  
  // Verificar se next.config.ts tem configuração correta
  if (fs.existsSync('next.config.ts')) {
    const configContent = fs.readFileSync('next.config.ts', 'utf8');
    if (!configContent.includes('experimental')) {
      console.log('📝 Atualizando next.config.ts...');
      const newConfig = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;`;
      fs.writeFileSync('next.config.ts', newConfig);
      console.log('✅ next.config.ts atualizado');
    }
  }
}

function main() {
  console.log('🩺 Diagnóstico de Problemas do Projeto\n');
  
  const checks = [
    checkFileStructure,
    checkDependencies,
    checkImports
  ];
  
  const results = checks.map(check => check());
  
  if (results.every(result => result)) {
    console.log('\n🎉 Nenhum problema encontrado!');
  } else {
    console.log('\n🔧 Aplicando correções...');
    fixCommonIssues();
    console.log('\n✅ Correções aplicadas!');
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkFileStructure, checkImports, checkDependencies, fixCommonIssues };
