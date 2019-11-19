const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Users = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.level = user.level;
  this.kode = user.kode;
  this.nama = user.nama;
};

Users.register = (newUser, done) => {
  bcrypt.hash(newUser.password, 12, (err, password) => {
    db.query(
      'INSERT INTO users SET ?',
      {
        username: newUser.username,
        password: password,
        level: newUser.level,
        kode: newUser.kode,
        nama: newUser.nama
      },
      (err, user) => {
        if (err) {
          done(err, null);
        } else {
          done(null, user.id);
        }
      },
    );
  });
};

Users.getUserByUsername = (username, done) => {
  db.query(
    'SELECT username, level, kode, nama FROM users WHERE username =?',
    [username],
    (err, res) => {
      if (err) {
        done(err, null);
      } else {
        done(null, res);
      }
    },
  );
};

module.exports = Users;
