// const { assert } = require("chai");
// const {Token}=require("../src/lib/token");
// const token=new Token();
// const jwt=require("jsonwebtoken")

// describe("authentication", function(){
//     it("user found to db for verify", async function(){
//         const email="MARYAM234@yahoo.com";
//         const userToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1BUllBTTIzNEB5YWhvby5jb20iLCJpYXQiOjE2NzUyNDUxOTQsImV4cCI6MTY3NTM0NTE5NH0.gDIPcrXRhGTJ7dWpyKpZhljuQ5XfN_kFW4j0cAXbWrQ"
//         let decodedT=await token.verifyToken(userToken)
//         assert.equal(email,decodedT.email)
//     })

//     it("user not found to db for verify",async function(){
//         const email="MARY234@yahoo.com";
//         const userToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1BUllBTTIzNEB5YWhvby5jb20iLCJpYXQiOjE2NzUyNDUxOTQsImV4cCI6MTY3NTM0NTE5NH0.gDIPcrXRhGTJ7dWpyKpZhljuQ5XfN_kFW4j0cAXbWrQ"
//         let decodedT=await token.verifyToken(userToken)
//         assert.equal(email,decoded_email.email) })
// })



