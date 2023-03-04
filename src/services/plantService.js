const {plants} = require("../model/plant");

class PlantService{
    static addNewPlant(req) {
        return new Promise(async(resolve , reject)=>{
            let newP = await plants.create({
                name: req.body.name,
                image: req.file.path,    
                temperature: req.body.temperature,
                light: req.body.light,
                moisture: req.body.moisture,
                explanation: req.body.explanation,
            });
            if(newP){
                resolve(true)
            }else{
                reject(false)
            }
        })

    };

    static deletePlant(plantId) {
        return new Promise((resolve, reject) => {
            let deletedPlant = plants.findByIdAndDelete(plantId,function (err, result) {
                if (result) {
                  console.log("hello")

                  resolve(true);
                } else {
                  console.log("fg")

                  reject(false);
                }
            });
        });
    };

    static updatePlant(body,plantId) {
      return new Promise((resolve, reject) => {
        plants.findByIdAndUpdate(
          plantId,
          {
            name: body.name,
            image: body.image,
            temperature: body.temperature,
            light: body.light,
            moisture: body.moisture,
            explanation: body.explanation,
          },
          function (err, result) {
            if (result) {
              resolve(result);
            } else {
              reject("Failed");
            }
          }
        );
      });
      }
};
module.exports = {PlantService}