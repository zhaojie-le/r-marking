var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
const fs = require('fs');
const config = require('./config');


//判断环境 是否是mock
var isMock = process.env.isMock;

router.post('/list', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/strategy/list.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/start', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/strategy/start.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/stop', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/strategy/stop.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

module.exports = router;