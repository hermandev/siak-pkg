const express = require("express");
const router = express.Router();
const {
  checkLogin,
  checkAdmin,
  checkOperator,
  checkGuru
} = require("../middleware/authentication");
const csrf = require("csurf");
const csrfProtection = csrf();
router.use(csrfProtection);
const fs = require("fs");

// controller
const Admin = require("../controllers/Admin");
const Operator = require("../controllers/Operator");
const Guru = require("../controllers/Guru");
const Dashboard = require("../controllers/Dashboard")
// models
const Level = require("../models/Level");

// all dashboard
router.get("/", checkLogin, Dashboard.getDashboard);
// end all dashboard

// dashboard admin
router.get("/daftar-sekolah", checkLogin, checkAdmin, Admin.getSekolah);
router.get(
  "/daftar-sekolah/daftar",
  checkLogin,
  checkAdmin,
  Admin.getAddSekolah
);
router.post(
  "/daftar-sekolah/daftar",
  checkLogin,
  checkAdmin,
  Admin.addSekolah
);
router.get(
  "/daftar-sekolah/delete/:id",
  checkLogin,
  checkAdmin,
  Admin.delSekolah
);

// open pdf file
router.get("/pdf", async (req, res) => {
  let filePath = "./data/pdf/mypdf.pdf";
  fs.readFile(filePath, function (err, data) {
    res.contentType("application/pdf");
    console.log(data)
    res.send(data);
  });
});
// end dashboard admin

// dashboard operator
router.get("/daftar-guru", checkLogin, checkOperator, Operator.getDaftarGuru);
router.get("/daftar-guru/daftar", checkLogin, checkOperator, Operator.getFormDaftarGUru);
router.post("/daftar-guru/daftar", checkLogin, checkOperator, Operator.postFormDaftarGuru);
router.get("/operator/profile", checkLogin, checkOperator, Operator.getProfile);
// end dashboard operator

// dashboard guru
router.get("/guru/profile", checkLogin, checkGuru, Guru.getProfile);
router.post("/guru/profile", checkLogin, checkGuru, Guru.updateProfile);

// end dashboard guru

module.exports = router;
