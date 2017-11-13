const fs = require('fs');
const xlsxFormat = require('./formats/xlsx');
const csvFormat = require('./formats/csv');

module.exports = {
	parse: (buffer, ext, columnFunc = null, rowFunc = null) => {
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
};