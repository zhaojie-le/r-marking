var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
const fs = require('fs');
const config = require('./config');

//判断环境 是否是mock
var isMock = process.env.isMock;

router.get('/edit/229633399113924614', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/detailRules/rules.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.post('/save', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/createRules/save.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

module.exports = router;