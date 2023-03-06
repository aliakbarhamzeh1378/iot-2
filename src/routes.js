const glob = require('glob');


module.exports = (app) => {
	glob(`${__dirname}/routes/**/*Router.js`, {}, (er, files) => {
		console.log(files)
		if (er) throw er;
		files.forEach(file => {
			// console.log(file)

			require(file)(app)
		});
		// files.forEach(file => (
		//
		//
		// ));
	});
};
