const {accounts}=require("../src/model/account")
const mongoose=require("mongoose")
const {AuthService}=require("../src/services/authService")
const {hashs}=require("../src/model/hash")
const assert = require('assert');

// describe("generate random hash number for people who forget their password", () => {
// 	it("test for saving hash in db", (done) => {
// 		const newHash = new hashs({ email: 'dtyuyju' });
// 		newHash.save() // returns a promise after some time
// 			.then(() => {
//                 console.log(newHash)
// 				//if the newUser is saved in db and it is not new
// 				assert(!newHash.isNew);
// 				done();
// 			});
// 	});
// });
