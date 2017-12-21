var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
const fs = require('fs');
const config = require('./config');

//判断环境 是否是mock
var isMock = process.env.isMock;

router.get('/getRule', function(req, res, next) {
    switch (req.query.strategyType) {
        case 1:
            fs.readFile(__dirname + '/../usermock/createRules/rules.json', 'utf8', (err, data) => {
                res.json(JSON.parse(data));
            });
            break;
        case 7:
            fs.readFile(__dirname + '/../usermock/createRules/pendantRule.json', 'utf8', (err, data) => {
                res.json(JSON.parse(data));
            });
            break;
        default:
            fs.readFile(__dirname + '/../usermock/createRules/rules.json', 'utf8', (err, data) => {
                res.json(JSON.parse(data));
            });
            break;
    }    
});

router.post('/save', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/createRules/save.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/getService', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/createRules/serviceData.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/getOrderState', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/createRules/orderState.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/toAddChannel', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/createRules/addChannel.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/getWechatPush', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/createRules/getWechatPush.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

module.exports = router;