const tojson = require('..');
const fs = require('fs');
const CSVTestDoc = './test/test.csv';
const XLSXTestDoc = './test/test.xlsx';

fs.readFile(CSVTestDoc, (err, buffer) => {
    if(err) {
        console.log(err);
        return;
    }

    return tojson.parse(buffer, tojson.getExtenstion(CSVTestDoc))
        .then(result => {
            console.log('buffer csv done');
        })
});


fs.readFile(XLSXTestDoc, (err, buffer) => {
    if(err) {
        console.log(err);
        return;
    }

    return tojson.parse(buffer, tojson.getExtenstion(XLSXTestDoc))
        .then(result => {
            console.log('buffer xlsx done');
        })
});

tojson.parse(CSVTestDoc)
    .then(result => {
        console.log('string csv done');
    })

tojson.parse(XLSXTestDoc)
    .then(result => {
        console.log('string xlsx done');
    })