#!/usr/bin/env node

/**
 * Script para verificar se o servidor está funcionando
 */

const http = require('http');

function checkServer() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000', (res) => {
      console.log(`✅ Servidor respondendo - Status: ${res.statusCode}`);
      resolve(true);
    });
    
    req.on('error', (error) => {
      console.log(`❌ Servidor não está respondendo: ${error.message}`);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('⏰ Timeout - Servidor não respondeu em 5 segundos');
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  console.log('🔍 Verificando se o servidor está funcionando...\n');
  
  const isWorking = await checkServer();
  
  if (isWorking) {
    console.log('\n🎉 Servidor funcionando perfeitamente!');
    console.log('🌐 Acesse: http://localhost:3000');
  } else {
    console.log('\n❌ Servidor não está funcionando');
    console.log('💡 Tente executar: npm run dev');
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkServer };
