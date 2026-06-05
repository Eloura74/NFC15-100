require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcryptjs');

console.log('=== Test de .env.local ===\n');

const email = process.env.ADMIN_EMAIL;
const hash = process.env.ADMIN_PASSWORD_HASH;

console.log('ADMIN_EMAIL:', email);
console.log('ADMIN_PASSWORD_HASH:', hash);
console.log('Hash length:', hash ? hash.length : 0);
console.log('\n=== Test du mot de passe ===\n');

const password = 'Aaron141216!';
console.log('Mot de passe testé:', password);

if (hash) {
  const isValid = bcrypt.compareSync(password, hash);
  console.log('Résultat:', isValid ? '✅ VALIDE' : '❌ INVALIDE');
  
  if (!isValid) {
    console.log('\n⚠️ Le hash dans .env.local ne correspond PAS au mot de passe');
    console.log('\n=== Hash correct à utiliser ===');
    const correctHash = bcrypt.hashSync(password, 10);
    console.log(correctHash);
    console.log('\nRemplacez dans .env.local par:');
    console.log(`ADMIN_PASSWORD_HASH=${correctHash}`);
  }
} else {
  console.log('❌ ADMIN_PASSWORD_HASH est vide ou non défini !');
}
