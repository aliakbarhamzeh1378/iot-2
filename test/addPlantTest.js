// const {PlantService}=require("../src/services/plantService")
const {plants}=require("../src/model/plant")
const assert = require("assert");
const {PlantService}=require("../src/services/plantService")
describe("this is related to pants",function(){
    it("this is for adding new plant to db",async function(){
        let plantAdd=await PlantService.addNewPlant({
            name: "davoodi",
            image: "req.file.path",    
            temperature: 23,
            light: 11,
            moisture: 15,
            explanation: "hard to explain",
    });
    assert.equal(plantAdd,true)
    assert.equal(plantAdd,false)

        })
    })
