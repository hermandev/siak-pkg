const Guru = require("../models/Guru")
const Users = require("../models/Users")
const { checkUser } = require("../config/helper")

module.exports = {
    getDaftarGuru: (req, res) => {
        try {
            Guru.getAllGuruByNpsn(req.user.kode, (err, guru) => {
                if (err) {
                    req.flash('error', 'Syetem gagal mengambil data')
                    res.redirect("/")
                } else {
                    checkUser(req.user.kode, req.user.level, (err, data) => {
                        return res.render('page/operator/daftar-guru', {
                            title: "SIAK-PKG | Dafatar Guru",
                            login: false,
                            users: req.user,
                            user: data[0],
                            data: guru
                        })
                    })
                }
            })

        } catch (error) {
            req.flash('error', 'Ada masalah pada system. hubungi developer')
            res.render('page/operator/daftar-guru', {
                title: "SIAK-PKG | Dafatar Guru",
                login: false,
                users: req.user
            })
        }
    },

    getFormDaftarGUru: (req, res) => {
        let data = { nip:"", nama:"", temp_lahir:"", tgl_lahir:"", kelamin:"", no_telp:"", alamat:"", pddk_terakhir:"", tmt_guru:"", pangkat:"", jabatan:"", golongan:"", tgs_tambahan:"" }
        checkUser(req.user.kode, req.user.level, (err, user) => {
            if(user.length != 0) {
                return res.render('page/operator/daftar', {
                    title: "SIAK-PKG | Form Dafatar Guru",
                    login: false,
                    users: req.user,
                    user: user[0],
                    data:data,
                    csrfToken: req.csrfToken(),
                })
            }
        })
    },
    postFormDaftarGuru:async (req, res) => {
        const { nip, nama, temp_lahir, tgl_lahir, kelamin, agama, no_telp, alamat, pddk_terakhir, tmt_guru, pangkat, jabatan, golongan, tgs_tambahan } = req.body
        try {
            let data = { nip: nip.replace(/ /g, ""), nama, temp_lahir, tgl_lahir, kelamin, agama, no_telp, alamat, pddk_terakhir, tmt_guru, pangkat, jabatan, golongan, tgs_tambahan, npsn_sekolah:req.user.kode }
            if (nip == "" || nama == "" || temp_lahir == "" || tgl_lahir == "" || no_telp == "" || agama == "0" || alamat == "" || pddk_terakhir == "" || tmt_guru == "" || pangkat == "" || jabatan == "" || golongan == "" || tgs_tambahan == "") {
                if (nip == "") {
                    req.flash('nip', 'Tidak boleh kosong')
                }
                if (nama == "") {
                    req.flash('nama', 'Tidak boleh kosong')
                }
                if(temp_lahir == "") {
                    req.flash('temp_lahir', 'Tidak boleh kosong')
                }
                if(tgl_lahir == "") {
                    req.flash('tgl_lahir', 'Belum lengkap')
                }
                if(no_telp == "") {
                    req.flash('no_telp', 'Tidak boleh kosong')
                }
                if(agama == "0") {
                    req.flash('agama', 'Belum di pilih')
                }
                if(alamat == "") {
                    req.flash('alamat', 'Tidak boleh kosong')
                }
                if(pddk_terakhir == "") {
                    req.flash('pddk_terakhir', 'Tidak boleh kosong')
                }
                if(tmt_guru == "") {
                    req.flash('tmt_guru', 'Belum lengkap')
                }
                if(pangkat == "") {
                    req.flash('pangkat', 'Tidak boleh kosong')
                }
                if(jabatan == "") {
                    req.flash('jabatan', 'Tidak boleh kosong')
                }
                if(golongan == "") {
                    req.flash('golongan', 'Tidak boleh kosong')
                }
                if(tgs_tambahan == "") {
                    req.flash('tgs_tambahan', 'Tidak boleh kosong')
                }

                return res.render('page/operator/daftar', {
                    title: "SIAK-PKG | Dafatar Guru",
                    login: false,
                    csrfToken: req.csrfToken(),
                    data: data,
                    users:req.user
                })

            } else {
                const guru = new Guru(data)
                Guru.getGuruByNip(data.nip, (err, result) => {
                    if(result.length !== 0) {
                        req.flash('nip', 'NIP sudah terdaftar')
                        return res.render('page/operator/daftar', {
                            title: "SIAK-PKG | Dafatar Guru",
                            login: false,
                            csrfToken: req.csrfToken(),
                            data: data,
                            users:req.user
                        })
                    }
                    Guru.addGuru(guru, (err, result) =>{
                        if(err) {
                            req.flash('error', 'Ada masalah pada system. hubungi developer')
                            res.redirect("/daftar-guru")
                        } else {
                            let username = data.nip.substr(nip.length - 10)
                            const user = new Users({username:username, password:username, level:"guru", kode:data.nip,nama: data.nama})
                            Users.register(user, (err, result) => {
                                if(err) {
                                    req.flash('error', 'Gagal menyimpan data')
                                    res.redirect('/daftar-guru')
                                } else {
                                    req.flash('success', 'Data berhasil di simpan')
                                    res.redirect('/daftar-guru')
                                }
                            })
                        }
                    })
                })
                
            }
        } catch (error) {
            req.flash('error', 'Ada masalah pada system. hubungi developer')
            res.redirect("/daftar-guru")
        }
    },

    getProfile: (req, res) => {
        checkUser(req.user.kode, req.user.level, (err, data) => {
            if(data.length != 0) {
                return res.render('page/operator/profile', {
                    title: "SIAK-PKG | Profile",
                    login: false,
                    users: req.user,
                    user: data[0],
                })
            }
        })
    },
    
}