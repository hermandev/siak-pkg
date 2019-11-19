module.exports = {
    checkLogin: (req, res, next) => {
        if(!req.user) {
            res.redirect('/masuk');
        } else {
            next()
        }
    },
    redirectHome: (req, res, next) => {
        if(req.user) {
            res.redirect('/');
        } else {
            next()
        }
    },
    checkAdmin: (req, res, next) => {
        if(req.user.level === "operator") {
            return res.render('page/404', {
                title: "404 | Halaman tidak di temukan", login: false
            })
        } else if(req.user.level === "guru") {
            return res.render('page/404', {
                title: "404 | Halaman tidak di temukan", login: false
            })
        } else {
            next()
        }
        
    },
    checkOperator: (req, res, next) => {
        if(req.user.level === "admin") {
            return res.render('page/404', {
                title: "404 | Halaman tidak di temukan", login: false
            })
        } else if(req.user.level === "guru") {
            return res.render('page/404', {
                title: "404 | Halaman tidak di temukan", login: false
            })
        } else {
            next()
        }
    },

    checkGuru: (req, res, next) => {
        if(req.user.level === "admin") {
            return res.render('page/404', {
                title: "404 | Halaman tidak di temukan", login: false
            })
        } else if(req.user.level === "operator") {
            return res.render('page/404', {
                title: "404 | Halaman tidak di temukan", login: false
            })
        } else {
            next()
        }
    }

    
}