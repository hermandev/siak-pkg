const db = require('../config/db')
// models data
const Sekolah = require("../models/Sekolah")
const Users = require("../models/Users")
module.exports = {
    getAddSekolah: async (req, res) => {
        let data = {
            npsn: "",
            nama: "",
            kode_pos: "",
            status: "",
            telp: "",
            desa: "",
            kecamatan: "",
            kabupaten: "",
            provinsi: "",
            jenjang: ""
        }
        await res.render('page/admin/tambah', {
            title: "SIAK-PKG | Dafatar Sekolah",
            login: false,
            csrfToken: req.csrfToken(),
            data: data,
            users:req.user
        })
    },
    addSekolah: async (req, res) => {
        const { npsn, nama, kode_pos, status, telp, desa, kecamatan, kabupaten, provinsi, jenjang } = req.body
        try {
            let data = { npsn, nama, kode_pos, status, telp, desa, kecamatan, kabupaten, provinsi, jenjang }
            

            if (npsn == "" || nama == "" || kode_pos == "" || status == "0" || telp == "" || desa == "" || kabupaten == "" || kecamatan == "" || provinsi == "" || jenjang == "0") {
                if (npsn == "") {
                    req.flash('npsn', 'Tidak boleh kosong')
                }
                if (nama == "") {
                    req.flash('nama', 'Tidak boleh kosong')
                }
                if (kode_pos == "") {
                    req.flash('kode_pos', 'Tidak boleh kosong')
                }
                if (status == "0") {
                    req.flash('status', 'Belum di pilih')
                }
                if (telp == "") {
                    req.flash('telp', 'Tidak boleh kosong')
                }
                if (desa == "") {
                    req.flash('desa', 'Tidak boleh kosong')
                }
                if (kecamatan == "") {
                    req.flash('kecamatan', 'Tidak boleh kosong')
                }
                if (kabupaten == "") {
                    req.flash('kabupaten', 'Tidak boleh kosong')
                }
                if (provinsi == "") {
                    req.flash('provinsi', 'Tidak boleh kosong')
                }
                if (jenjang == "0") {
                    req.flash('jenjang', 'Belum di pilih')
                }
                
                return res.render('page/admin/tambah', {
                    title: "SIAK-PKG | Dafatar Sekolah",
                    login: false,
                    csrfToken: req.csrfToken(),
                    data: data,
                    users:req.user
                })
                
            } else {
                Sekolah.getByNPSN(npsn, (err, result) => {
                    if(result.length !== 0) {
                        req.flash('npsn', 'NPSN Sudah terdaftar')
                        return res.render('page/admin/tambah', {
                            title: "SIAK-PKG | Dafatar Sekolah",
                            login: false,
                            csrfToken: req.csrfToken(),
                            data: data,
                            users:req.user
                        })
                    }
                    const sekolah = new Sekolah(req.body)
                    Sekolah.addSekolah(sekolah, (err, data) =>{
                        if(err) {
                            req.flash('error', 'Gagal menyimpan data')
                            res.redirect('/daftar-sekolah')
                        } else {
                            const users = new Users({username:npsn, password:npsn, level:"operator", kode:npsn,nama: nama })
                            Users.register(users, (err, data) => {
                                if(err) {
                                    req.flash('error', 'Gagal menyimpan data')
                                    res.redirect('/daftar-sekolah')
                                }else {
                                    req.flash('success', 'Data berhasil di simpan')
                                    res.redirect('/daftar-sekolah')
                                }
                            })
                        }
                    })
                })
                
            }

        } catch (error) {
            req.flash('error', 'Ada masalah pada system. hubungi developer')
            res.redirect('/daftar-sekolah')
        }
    },
    getSekolah: async (req, res) => {
        try {
            Sekolah.getAllSekolah((err, result) => {
                if(err) {
                    req.flash('error', 'Ada masalah pada system. hubungi developer')
                    res.render('page/admin/daftar-sekolah', {
                        title: "SIAK-PKG | Dafatar Sekolah",
                        login: false,
                    })
                }
                res.render('page/admin/daftar-sekolah', {
                    title: "SIAK-PKG | Dafatar Sekolah",
                    login: false,
                    data: result,
                    users:req.user
                })
            })
        } catch (error) {
            req.flash('error', 'Ada masalah pada system. hubungi developer')
            res.render('page/admin/daftar-sekolah', {
                title: "SIAK-PKG | Dafatar Sekolah",
                login: false,
                users:req.user
            })
        }
    },
    delSekolah: async (req, res) => {
        const { id } = req.params
        try {
            Sekolah.delete(id, (err, result) => {
                if (err) {
                    req.flash('error', 'Ada masalah pada system. hubungi developer')
                    res.redirect('/daftar-sekolah')
                }
                req.flash('success', 'Data berhasil di hapus')
                res.redirect('/daftar-sekolah')
            })
        } catch (error) {
            req.flash('error', 'Ada masalah pada system. hubungi developer')
            res.redirect('/daftar-sekolah')
        }
    }
}