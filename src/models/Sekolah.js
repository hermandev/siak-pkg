const db = require("../config/db");

const Sekolah = function(sekolah) {
  this.npsn = sekolah.npsn;
  this.nama = sekolah.nama;
  this.kode_pos = sekolah.kode_pos;
  this.status = sekolah.status;
  this.telp = sekolah.telp;
  this.desa = sekolah.desa;
  this.kecamatan = sekolah.kecamatan;
  this.kabupaten = sekolah.kabupaten;
  this.provinsi = sekolah.provinsi;
  this.jenjang = sekolah.jenjang;
};

Sekolah.addSekolah = (newSekolah, done) => {
  db.query("INSERT INTO `sekolah` SET ?", newSekolah, (err, res) => {
    if (err) {
      done(err, null);
    } else {
      done(null, res.id);
    }
  });
};

Sekolah.getByNPSN = (npsn, done) => {
  db.query("SELECT npsn FROM sekolah WHERE npsn=?", [npsn], (err, res) => {
    if (err) {
      done(err, null);
    } else {
      done(null, res);
    }
  });
};

Sekolah.getAllSekolah = done => {
  db.query(
    "SELECT id,npsn,nama,jenjang,status,telp FROM sekolah ORDER BY id DESC",
    (err, res) => {
      if (err) {
        done(err, null);
      } else {
        done(null, res);
      }
    }
  );
};

Sekolah.delete = (id, done) => {
  db.query("SELECT npsn FROM sekolah WHERE id=?", [id], (err, result) => {
    if (err) {
      done(err, null);
    } else {
      db.query(
        "DELETE FROM users WHERE username=?",
        [result[0].npsn],
        (err, user) => {
          if (err) {
            done(err, null);
          } else {
            db.query("DELETE FROM sekolah WHERE id=?", [id], (err, res) => {
              if (err) {
                done(err, null);
              } else {
                done(null, res);
              }
            });
          }
        }
      );
    }
  });
};

Sekolah.getSekolahByNpsn = (npsn, done) => {
  db.query("SELECT * FROM sekolah WHERE npsn = ?", [npsn], (err, result) => {
    if (err) {
      done(err, null);
    } else {
      done(null, result);
    }
  });
};

module.exports = Sekolah;
