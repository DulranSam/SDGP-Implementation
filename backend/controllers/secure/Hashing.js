const bcrypt = require("bcrypt");
const randomNumber = Math.random();

class HashPass {
  constructor(password) {
    this.hashedPassword = bcrypt.hashSync(password, randomNumber);
  }

  getHashedPassword() {
    return this.hashedPassword;
  }
}

module.exports = HashPass;
