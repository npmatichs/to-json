const driver = require('xlsx');

module.exports = {
	driver : () => driver,
	parse : (buffer, columnFunc = null, rowFunc = null) => {
		let stylesheet = driver.read(buffer);

		let worksheet = stylesheet.Sheets[stylesheet.SheetNames[0]];
        let headers = {};
        let data = [];
        for (let z in worksheet) {
            if (z[0] === '!') {
            	continue;
            }
            let tt = 0;
            for (let i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            let col = z.substring(0, tt);
            let row = parseInt(z.substring(tt));
            let value = worksheet[z].v;

            if (row == 1 && value) {
                headers[col] = columnFunc ? columnFunc(value) : value;
                continue;
            }

            if (!data[row]) {
            	data[row] = {};
            }

            data[row][headers[col]] = rowFunc ? rowFunc(value) : value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();

        return data;
	}
}