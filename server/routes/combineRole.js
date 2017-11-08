var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
const fs = require('fs');
const config = require('./config');


//判断环境 是否是mock
var isMock = process.env.isMock;

router.get('/list', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/role/roleLists.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.post('/delete-by-roleid', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/role/deleteRole.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/get-by-roleid-all', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/role/editRoleInfo.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/get-by-roleid', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/role/roleInfo.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/check-repeat-name', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/role/checkRepeatName.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.post('/save-or-update', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/role/addOrUpdateRole.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});




module.exports = router;