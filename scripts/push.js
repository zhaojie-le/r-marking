const request = require('request');
const fs = require('fs');
const path = require('path');
const upPath = `${__dirname}/../build/`;
const root = path.resolve(process.argv[2] || '.');
const filepath = path.join(root, 'build');

var r = request.post('http://localhost:5000/upload', function optionalCallback(err, httpResponse, body) {
    console.log(httpResponse);
});
var form = r.form();
form.append('my_field', 'my_value');
form.append('my_buffer', new Buffer([1, 2, 3]));
form.append('custom_file', fs.createReadStream(filepath + 'asset-manifest.json'), {filename: 'asset-manifest.json'});
