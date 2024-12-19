const express = require("express");
const router = express.Router();
const reportModel = require("../models/reportModel");
const auth = require("../middleware/auth")
const userModel = require("../models/userModel");

//posting a report
router.post("/newReport", auth, async(req, res) => {
    try {
        if (!req.body.userid || !req.body.location || !req.body.reporturl || !req.body.cat || !req.body.desc) {
          return res.status(400).json({ message: "Not all fields have been filled" });
        }
        
        // Create new report
        const newReport = new reportModel({
          userid: req.body.userid,
          location: req.body.location,
          reporturl: req.body.reporturl,
          cat: req.body.cat,
          status: req.body.status,
          desc: req.body.desc
        });
    
        // Save report to database using await
        const report = await newReport.save();
    
        // After saving report, increment user's reportCount
        await userModel.findByIdAndUpdate(req.body.userid, { $inc: { reportCount: 1 } });
    
        // Return the saved report
        res.status(200).json(report);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
});


//getting all reports of a user
router.post("/uniReport", auth, (req, res) => {
    const id = req.body._id;
    console.log('Fetching reports for user:', id);
    try {
        reportModel.find({ userid : id }).then((data) => {
            console.log('Reports data:', data);
            res.status(200).json(data);
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ message: error.message });
    }
});

//getting all reports
router.get("/allreport", auth, (req, res) => {
    try {
        reportModel.find().then((data) => {
            res.status(200).json(data);
        });

    } catch (error) {

        res.status(400).json({ message: error.message });

    }


});

function isInCircle(lat1, lon1, lat2, lon2, radius) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance <= radius;
}

//verifying whether given point is in the circle or not
router.post("/zonalReports", auth, (req, res) => {
    if(!req.body.location || !req.body.radius) {
        return res.status(400).json({ message: "Not all fields have been filled" })
    }
    const lat = req.body.location.lat
    const long = req.body.location.long
    var filter = {}
    if(req.body.category) {
        filter["cat"] = req.body.category
    }
    var matchedReports = []
    reportModel.find(filter)
    .then((reports) => {
        reports.map((report) => {
            const location = report.location
            if(isInCircle(lat, long, location["lat"], location["long"], req.body.radius)) {
                matchedReports.push(report)
            }
        })
    })
    .then(() => {res.status(200).json(matchedReports)})
})

router.post("/markReports", auth, (req, res) => {
    const reports = req.body.data
    Promise.all(reports.map(async report => {
        var updateDetails = {}
        if(report.responseurl) {
            updateDetails["responseurl"] = report.responseurl
        }
        if(report.status) {
            updateDetails["status"] = report.status
        }
        return await reportModel.updateOne({ _id : report._id }, updateDetails)
    }))
    .then(() => {
        res.status(200).send("Updated Succesfully")
    })
})





module.exports = router;