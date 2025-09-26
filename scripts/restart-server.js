#!/usr/bin/env node

/**
 * Script para reiniciar o servidor de desenvolvimento
 * Mata todos os processos Node.js e limpa o cache
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function killNodeProcesses() {
  console.log('🔄 Matando processos Node.js...');
  
  try {
    // Windows
    if (process.platform === 'win32') {
      execSync('taskkill /F /IM node.exe 2>nul', { stdio: 'ignore' });
    } else {
      // Unix/Linux/Mac
      execSync('pkill -f node', { stdio: 'ignore' });
    }
    console.log('✅ Processos Node.js finalizados');
  } catch (error) {
    console.log('ℹ️ Nenhum processo Node.js encontrado');
  }
}

function clearCache() {
  console.log('🧹 Limpando cache...');
  
  const cacheDirs = ['.next', 'node_modules/.cache'];
  
  cacheDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`✅ ${dir} removido`);
      } catch (error) {
        console.log(`⚠️ Erro ao remover ${dir}:`, error.message);
      }
    }
  });
}

function startDevServer() {
  console.log('🚀 Iniciando servidor de desenvolvimento...');
  
  const devProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });
  
  devProcess.on('error', (error) => {
    console.error('❌ Erro ao iniciar servidor:', error);
  });
  
  devProcess.on('exit', (code) => {
    console.log(`📊 Servidor finalizado com código: ${code}`);
  });
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Finalizando servidor...');
    devProcess.kill('SIGINT');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 Finalizando servidor...');
    devProcess.kill('SIGTERM');
    process.exit(0);
  });
}

function main() {
  console.log('🔄 Reiniciando servidor de desenvolvimento...\n');
  
  killNodeProcesses();
  clearCache();
  
  console.log('\n⏳ Aguardando 2 segundos...');
  setTimeout(() => {
    startDevServer();
  }, 2000);
}

if (require.main === module) {
  main();
}

module.exports = { killNodeProcesses, clearCache, startDevServer };
