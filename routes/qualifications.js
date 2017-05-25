const express = require('express');
const router = express.Router();
const Qualification = require('../model/qualification');
const config = require('../config/database');
const passport = require('passport');

//Add Qualification
router.post('/dashboard', (req, res, next) => {
    "use strict";
    let newqualification = new Qualification({
        qualificationName: req.body.qualificationName,
        year: req.body.year,
        college: req.body.college,
        university: req.body.university,
        user: req.body.user
    });
    Qualification.addQualification(newqualification, (err, qualification) => {
        if (err) {
            return res.json({ success: false, msg: 'Failed to add new qualification' });
        } else {
            return res.json({ success: true, msg: 'Qualification added' });
        }
    });
});

router.post('/qualData', (req, res, next) => {
    //const user="ishita";
    const username = req.body.user;
    Qualification.getQual(username, (err, qualification) => {
        if (err) throw err;
        else {
            return res.json({ qualification: qualification });
        }
    });
});

router.post('/updateQualData', (req, res, next) => {
    console.log('in qual js ');
    let editedQualification = new Qualification({
        _id: req.body._id,
        qualificationName: req.body.qualificationName,
        year: req.body.year,
        college: req.body.college,
        university: req.body.university,
        user: req.body.user
    });
    Qualification.editQual(editedQualification, (err, qualification) => {
        if (err) throw err;
        else {
            qualification.qualificationName = editedQualification.qualificationName;
            qualification.university = editedQualification.university;
            qualification.year = editedQualification.year;
            qualification.user = editedQualification.user;
            qualification.college = editedQualification.college;
            qualification.save();
            return res.json({ qualification: qualification, success: true });
        }
    });
});

router.post('/delQualData', (req, res, next) => {
    const id = req.body._id;
    Qualification.delQual(id, (err, qualification) => {
        if (err) throw err;
        else {
            if (qualification != null) {
                qualification.remove();
                return res.json({ success: true });
            }

        }
    });
});
module.exports = router;