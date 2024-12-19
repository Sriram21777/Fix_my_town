const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const zoneModel = require("../models/zoneModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signin
router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "Not all the fields have been filled" });
    return;
  }
  async function logIn(email, password) {
    const zonalAdmin = await zoneModel.findOne({ email });

    if (!zonalAdmin) {
      res.status(400).json({ message: "User doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, zonalAdmin.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: zonalAdmin._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        id: zonalAdmin._id,
      },
    });
  }

  logIn(req.body.email, req.body.password);
});

router.post("/newZone", auth, (req, res) => {
  if (!req.body.name || !req.body.center || !req.body.radius || !req.body.adminName || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Not all fields have been filled" });
  }
  const newZone = new zoneModel({
      name: req.body.name,
      center: req.body.center,
      radius: req.body.radius,
      adminName: req.body.adminName,
      email: req.body.email,
      password: req.body.password
  })
  try {
      newZone.save().then((zone) => {
          res.status(200).json(zone);
      })


  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

router.get("/allZones", auth, (req, res) => {
  var resZones = []
  zoneModel.find()
  .then((zones) => {
    zones.map(zone => {
      var curr = zone
      curr["center"]["radius"] = curr["radius"]
      curr["radius"] = undefined
      resZones.push(curr)
    })
  })
  .then(() => {res.status(200).json({"data" : resZones})})
})

module.exports = router;
