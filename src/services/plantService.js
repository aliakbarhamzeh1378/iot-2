const {plants}=require("../model/plant");

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
    
  static async listOfPlants(search) {
    let allPlants=await plants.find({});
    const foundPlants = [];
    allPlants.forEach((plant) => {
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

  static async addNewPlant(req, user) {
      await plants.create({
        // user_id: user._id,
        name: req.body.name,
        image: req.file.path,    
        temperature: req.body.temperature,
        light: req.body.light,
        moisture: req.body.moisture,
        explanation: req.body.explanation,
      });
   }
  
}
  



module.exports={PlantService};