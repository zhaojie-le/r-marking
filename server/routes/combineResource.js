var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
const fs = require('fs');
const config = require('./config');


//判断环境 是否是mock
var isMock = process.env.isMock;

router.get('/list-apps', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/resource/appLists.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/tree', function(req, res, next) {
    if(req.query['resourceId'] != 0) {
        fs.readFile(__dirname + '/../usermock/resource/tree.json', 'utf8', (err, data) => {
            res.json(JSON.parse(data));
        });
    } else {
        fs.readFile(__dirname + '/../usermock/resource/treeall.json', 'utf8', (err, data) => {
            res.json(JSON.parse(data));
        });
    }
});

router.post('/save-or-update', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/resource/addOrUpdateResource.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/delete-by-resourceid', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/resource/deleteResource.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/get-by-resourceid', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/resource/resourceInfo.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

router.get('/check-repeat-pageid', function(req, res, next) {
    fs.readFile(__dirname + '/../usermock/resource/checkId.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

module.exports = router;