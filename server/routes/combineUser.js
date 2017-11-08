var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
const fs = require('fs');
const config = require('./config');


//判断环境 是否是mock
var isMock = process.env.isMock;
router.get('/login', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/user/login.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});


router.get('/logout', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/user/logout.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/list', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/user/list.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/get-by-userid', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/user/userInfo.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});


router.post('/grant', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/user/updateRole.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/check-page-router', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/user/checkPageRouter.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/check-page-routers', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/user/checkPageRouters.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/check-page-ids', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/user/checkPageIds.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

module.exports = router;