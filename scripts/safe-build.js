#!/usr/bin/env node

/**
 * Script de Build Seguro
 * Executa verificações antes do build para prevenir erros
 */

const { execSync } = require('child_process');
const fs = require('fs');

function runCommand(command, description) {
  console.log(`\n🔧 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} concluído!`);
    return true;
  } catch (error) {
    console.error(`❌ Erro em: ${description}`);
    console.error(error.message);
    return false;
  }
}

function checkDependencies() {
  console.log('📦 Verificando dependências...');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
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
  ];
  
  const missingDeps = requiredDeps.filter(dep => 
    !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
  );
  
  if (missingDeps.length > 0) {
    console.log('❌ Dependências faltantes:');
    missingDeps.forEach(dep => console.log(`  - ${dep}`));
    console.log('\n📦 Instalando dependências faltantes...');
    runCommand(`npm install ${missingDeps.join(' ')}`, 'Instalação de dependências');
  } else {
    console.log('✅ Todas as dependências estão instaladas!');
  }
}

function lintCheck() {
  console.log('🔍 Verificando linting...');
  return runCommand('npm run lint', 'Verificação de linting');
}

function typeCheck() {
  console.log('🔍 Verificando tipos TypeScript...');
  return runCommand('npx tsc --noEmit', 'Verificação de tipos');
}

function safeBuild() {
  console.log('🏗️ Iniciando build seguro...');
  
  // 1. Verificar dependências
  checkDependencies();
  
  // 2. Verificar linting
  if (!lintCheck()) {
    console.log('⚠️ Problemas de linting encontrados, mas continuando...');
  }
  
  // 3. Verificar tipos
  if (!typeCheck()) {
    console.log('⚠️ Problemas de tipos encontrados, mas continuando...');
  }
  
  // 4. Build
  console.log('🏗️ Executando build...');
  if (runCommand('npm run build', 'Build do projeto')) {
    console.log('\n🎉 Build concluído com sucesso!');
  } else {
    console.log('\n❌ Build falhou!');
    process.exit(1);
  }
}

if (require.main === module) {
  safeBuild();
}

module.exports = { safeBuild, checkDependencies, lintCheck, typeCheck };
