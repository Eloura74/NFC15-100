const bcrypt = require('bcryptjs');

const password = 'Aaron141216!';
console.log('Mot de passe:', password);
console.log('Longueur:', password.length);

const hash = bcrypt.hashSync(password, 10);
console.log('\nHash généré:');
console.log(hash);

console.log('\n=== Copiez cette ligne dans .env.local ===');
console.log(`ADMIN_PASSWORD_HASH=${hash}`);

// Test de vérification
const isValid = bcrypt.compareSync(password, hash);
console.log('\nVérification:', isValid ? '✅ OK' : '❌ ERREUR');
