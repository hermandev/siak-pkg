const Level = require("../models/Level")

module.exports = {
    checkUser: (user, level, done) => {
        switch (level) {
            case "admin":
                Level.admin(user, (err, data) => {
                    if (err) {
                        done(err, null)
                    } else {
                        done(null, data)
                    }
                })
                break;
            case "operator":
                Level.operator(user, (err, data) => {
                    if (err) {
                        done(err, null)
                    } else {
                        done(null, data)
                    }
                })
                break;
            case "guru":
                Level.guru(user, (err, data) => {
                    if (err) {
                        done(err, null)
                    } else {
                        done(null, data)
                    }
                })
                break;

            default:
                break;
        }
    }
}