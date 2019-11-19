const db = require("../config/db");
const bcrypt = require("bcryptjs");

module.exports = {
  getLogin: (req, res) => {
    res.render("page/login", {
      title: "SIAK-PKG | Masuk",
      login: true,
      csrfToken: req.csrfToken(),
      error: req.flash("error")
    });
  },
  postLogin: (req, res) => {
    if (req.body.username === "" || req.body.password === "") {
      req.flash("error", "tidak boleh ada yang kosong");
    }
    res.render("page/login", {
      title: "SIAK-PKG | Masuk",
      login: true
    });
  },
  register: async (req, res) => {
    const { username, password } = req.body;
    let hashPassword = await bcrypt.hash(password, 12);
    try {
      await db.query(
        "INSERT INTO users SET ?",
        {
          username: username,
          password: hashPassword,
          level: "guru"
        },
        (err, result) => {
          if (err) {
            req.flash("username", "Gagal mendaftar");
            res.redirect("/masuk");
          }
          req.flash("username", "Daftar berhasil");
          res.redirect("/masuk");
        }
      );
    } catch (error) {
      console.log("Error :", error);
    }
  }
};
