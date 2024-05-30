const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = '1234password';
  // (que vamos a encriptar , No. de veces que encrypta )
  const hash = await bcrypt.hash(password, 11);
  console.log(hash);
}
hashPassword();
