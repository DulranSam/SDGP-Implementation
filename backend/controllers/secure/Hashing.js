const bcrypt = require("bcrypt");
const randomNumber = Math.random();

class HashPass {
  constructor(password) {
    this.password = password;
    return bcrypt.hashSync(password, randomNumber);
  }
}

module.exports = HashPass;
