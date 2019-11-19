const { checkUser } = require("../config/helper")

module.exports = {
    getProfile: (req, res) => {
        checkUser(req.user.kode, req.user.level, (err, data) => {
            if(data.length != 0) {
                return res.render('page/guru/profile', {
                    title: "SIAK-PKG | Profile",
                    login: false,
                    users: req.user,
                    user: data[0],
                    csrfToken: req.csrfToken(),
                })
            }
        })
    },
    updateProfile: (req, res) => {
        console.log(req.body)
        req.flash("success", "Profile berhasil di rubah")
        res.redirect("/guru/profile")
    }
}