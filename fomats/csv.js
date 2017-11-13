const driver = require('csv');

module.exports = {
	driver : () => driver,
	parse : (buffer, columnFunc = null, rowFunc = null) => {
		let stylesheet = driver.read(buffer);

        let data = [];           

// return new Promise((resolve, reject) =>
//             converter.process(source,
//                 (err, result) => err ? reject(err) : resolve(result)
           
        return data;
	}

    parse : (buffer, columnFunc = null, rowFunc = null) => 
        new Promise((resolve, reject) => {
            let data = [];

            return resolve(data);
        });
}