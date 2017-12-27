const request = require('request');
const fs = require('fs');
const path = require('path');
const upPath = `${__dirname}/../build/`;
const root = path.resolve(process.argv[2] || '.');
const filepath = path.join(root, 'build');
var jsFiles = fs.readdirSync(filepath + '/static/js');
var cssFiles = fs.readdirSync(filepath + '/static/css');
const files = [
    'asset-manifest.json', 
    'index.html', 
    'manifest.json', 
    'static/js/' + jsFiles[0], 
    'static/js/' + jsFiles[1], 
    'static/css/' + cssFiles[0], 
    'static/css/' + cssFiles[1]
];

var r = request.post(
    'http://10.253.10.179/upload/file', 
    function optionalCallback(err, httpResponse, body) {
        console.log('---------------------------');    
        console.log(httpResponse);
    }
);

var form = r.form();
files.forEach((item) => {
    const fileE = item.split('/');
    form.append(
        'custom_file', 
        fs.createReadStream(upPath + item),
        { 
            filename: fileE.length === 1 ? fileE[0] : fileE[2] 
        }
    );
});
