const db = require("../config/db")

const Level = function(user) {
    this.level = user.level
}

Level.operator = (npsn, done) => {
    db.query("SELECT * FROM sekolah WHERE npsn = ?", [npsn], (err, res) => {
        if(err) {
            done(err, null)
        } else {
            done(null, res)
        }
    })
}


Level.guru = (nip, done) => {
    db.query("SELECT * FROM guru WHERE nip=?", [nip], (err, guru) => {
        if(err) {
            done(err, null)
        } else {
            done(null, guru)
        }
    })
}



module.exports = Level