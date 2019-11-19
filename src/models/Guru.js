const db = require("../config/db")


const Guru = function(guru) {
    this.nip = guru.nip
    this.nama = guru.nama
    this.temp_lahir = guru.temp_lahir
    this.tgl_lahir = guru.tgl_lahir
    this.kelamin = guru.kelamin
    this.agama = guru.agama
    this.alamat = guru.alamat
    this.no_telp = guru.no_telp
    this.pddk_terakhir = guru.pddk_terakhir
    this.tmt_guru = guru.tmt_guru
    this.pangkat = guru.pangkat
    this.jabatan = guru.jabatan
    this.golongan = guru.golongan
    this.tgs_tambahan = guru.tgs_tambahan
    this.npsn_sekolah = guru.npsn_sekolah
}


Guru.addGuru = (newGuru, done) => {
    db.query("INSERT INTO guru SET ?", newGuru, (err, guru) => {
        if(err) {
            console.log(err)
            done(err, null)
        } else {
            done(null, guru)
        }
    })
}

Guru.getGuruByNip = (nip, done) => {
    db.query("SELECT * FROM guru WHERE nip = ?", [nip], (err, guru) => {
        if(err) {
            done(err, null)
        } else {
            done(null, guru)
        }
    })
}

Guru.getAllGuruByNpsn = (npsn ,done) => {
    db.query("SELECT * FROM guru WHERE npsn_sekolah = ? ORDER BY nama ASC",[npsn], (err, result) => {
        if(err) {
            done(err, null)
        } else {
            done(null, result)
        }
    })
}

module.exports = Guru