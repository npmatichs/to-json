const fs = require('fs');
const xlsxFormat = require('./formats/xlsx');
const csvFormat = require('./formats/csv');

const parse = (buffer, ext, columnFunc = null, rowFunc = null) => {
	//@todo: find a way to obtain buffer extension to select parse mode.
	// const ext = file.split('.').pop();

	if(buffer instanceof Buffer)
	{
		let result;

		switch (ext)
		{
			case 'csv':
				result = csvFormat.parse(buffer, columnFunc, rowFunc);
				break;
			case 'xlsx':
				result = xlsxFormat.parse(buffer, columnFunc, rowFunc);
				break;
			default :
				throw new Error(`The ${ext} file format doesn't support`);
				break;
		}

		return Promise.resolve(result);
	} else {
		throw new Error('This module working only with Buffer instance');
	}
}

const getExtenstion = (filePath) => {
	if(typeof filePath != 'string') {
		throw new Error('filePath argument must be a string');
	}

	return filePath.split('.').pop();
};

module.exports = {
	parse: (target, ext, columnFunc = null, rowFunc = null) => {
		if(target instanceof Buffer) {
			return parse(target, ext, columnFunc, rowFunc);
		} else if(typeof target == 'string') {
			if(! ext) {
				ext = getExtenstion(target);
			}

			return new Promise((resolve, reject) => {
				return fs.readFile(target, (err, buffer) => {
					if(err) {
						reject(err);
					}
					
					return resolve(buffer)
				})
			})
			.then(buffer => parse(buffer, ext, columnFunc, rowFunc));
		}

		return Promise.reject({});
	},
	getExtenstion: filePath => getExtenstion(filePath)
};