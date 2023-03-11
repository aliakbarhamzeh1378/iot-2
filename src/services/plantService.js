const {plants}=require("../model/plant");

class PlantService{
    
  static async listOfPlants(search) {
    let allPlants=await plants.find({});
    const foundPlants = [];
    allPlants.forEach((plant) => {
      console.log(plant)
        if (plant.name.match(search)) {
          foundPlants.push({
            name: plant.name,
            image: plant.image,
            objId: plant._id,
          });
        }
      });
      return foundPlants
  }

  static async addNewPlant(req) {
      await plants.create({
        name: req.body.name,
        image: req.file.path,    
        temperature: req.body.temperature,
        light: req.body.light,
        moisture: req.body.moisture,
        explanation: req.body.explanation,
      });
   }

   static deletePlant(plantId) {
    let p = new Promise((resolve, reject) => {
        let deletedPlant = plants.findByIdAndDelete(plantId,function (err, result) {
            if (result) {
              resolve(result);
            } else {
              reject("Failed");
            }
        });
      
    });
    return p;
  }

  static updatePlant(body,plantId) {
    let plant = new Promise((resolve, reject) => {
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
    return plant
  }
  
}
  



module.exports={PlantService};