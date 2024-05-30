const bcrypt = require('bcrypt');

async function verifyPassword() {
  const password = '1234password';
  const hash = '$2b$11$TyF6PitwlSHe9.D9RPAzA.MX7NGlBWAMov2AvPLOYgmWy7LXiHA4G';
  const isMatch = await bcrypt.compare(password, hash);
  console.log(isMatch);
}

verifyPassword();
