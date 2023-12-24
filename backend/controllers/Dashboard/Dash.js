class Dashboard {
  constructor(userName, userPassword, userMail) {
    this.username = userName;
    this.password = userPassword;
    this.mail = userMail;
  }

  // returnProg(req, res) {
  //   return res.json({
  //     Data: {
  //       Username: this.username,
  //       Password: this.password.hashedPassword,
  //       Mail: this.mail,
  //       Progress: {},
  //       PureMath: {},
  //       Statistics: {},
  //     },
  //   });
  // }
}

module.exports = Dashboard;
