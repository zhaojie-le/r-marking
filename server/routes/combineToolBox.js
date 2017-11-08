var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
const fs = require('fs');
const config = require('./config');


//判断环境 是否是mock
var isMock = process.env.isMock;

router.get('/list', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/toolbox/keywords.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/citys', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/toolbox/citys.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.post('/sign', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/toolbox/sign.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/expandtime', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/toolbox/expandtime.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/count-group', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/toolbox/countgroup.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

module.exports = router;