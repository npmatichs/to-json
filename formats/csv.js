const driver = require('csv');

module.exports = {
	driver : () => driver,
    parse : (buffer, columnFunc = null, rowFunc = null) => {
        return new Promise((resolve, reject) => {
            return driver.parse(buffer, (err, data) => {
                if(err) {
                    return reject(err);
                }

                if(columnFunc)
                {
                    // @todo: handle each column callback
                }

                if(rowFunc)
                {
                    // @todo: handle each row callback
                }

                return resolve(data);
            })
        });
    }
}