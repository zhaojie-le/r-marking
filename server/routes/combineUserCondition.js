var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
const fs = require('fs');
const config = require('./config');


//判断环境 是否是mock
var isMock = process.env.isMock;

router.get('/getTagNodeTree', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/userCondition/tagNode.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/getUserAmount', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/userCondition/userAmount.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});


module.exports = router;