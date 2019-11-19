const { checkUser } = require("../config/helper")


module.exports = {
  getDashboard: (req, res) => {
    if (req.user.level === "admin") {
      res.render("page/dashboard", {
        title: "SIAK-PKG | Dashboard",
        login: false,
        users: req.user
      });
    } else {
      checkUser(req.user.kode, req.user.level, (err, data) => {
        if (data.length != 0) {
          return res.render("page/dashboard", {
            title: "SIAK-PKG | Dashboard",
            login: false,
            users: req.user,
            user: data[0]
          });
        }
      })
    }
  }
};
