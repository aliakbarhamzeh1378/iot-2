const { PlantService } = require("../../services/plantService");
const { plants } = require("../../model/plant");
const {Token}=require("../../lib/token");
const { accounts } = require("../../model/account");
let token=new Token();

module.exports = {

  delete : async function(req,res){
      PlantService.deletePlant(req.params.id)
      .then((message) => {
          res.status(200).send({
          status: "ok",
          message: "plant deleted",
          data: {},
          });
      }).catch((message) => {
          res.status(401).send({
          status: "error",
          message: "there isn't any plant with this id",
          data: {},
          });
      });
  },

  update : async function(req,res){
      let p = PlantService.updatePlant(req.body, req.params.id);
      p.then((message) => {
        res.status(200).send({
          status: "Ok",
          message: `plant updated \n${message}`,
          data: {},
        });
      }).catch((message) => {
        res.status(404).send({
          status: "error",
          message: "there isn't any plant with this id",
          data: {},
        });
      });
  },
  listOfPlants: async (req, res, next) => {
    const search = req.query.search;
    const similarPlants = await PlantService.listOfPlants(search);
    if (similarPlants.length == 0) {
      res.status(404).send({
        status: "error",
        message: "not found",
        data: {},
      });
    } else {
      res.status(200).send({
        status: "ok",
        message: "find similar plants",
        data: { similarPlants },
      });
    }
  },

  findPlantById: (req, res, next) => {
    let plantId = req.params.plantId;
    plants.findById(plantId, (result, err) => {
      if (result) {
        res.status(200).send({
          status: "ok",
          message: "plant found",
          data: result,
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "plant not found",
          data: {},
        });
      }
    });
  },
 createNewPlant : async function(req,res){
    if(req.file==undefined){
      return res.status(406).send({
        status: "error",
        message: "image is empty",
        data: {},
      });
    }
    if ((await plants.findOne({ name: req.body.name })) == null) {
      let user_email=token.verifyToken(req.headers["authorization"]).then(async (usrToken)=>{
        let user=await accounts.findOne({email:usrToken.email});
        try {
          PlantService.addNewPlant(req,user._id);
          return res.status(200).send({
            status: "ok",
            message: "your new plant created",
            data: {},
          });
        } catch {
          res.status(408).send({
            status: "error",
            message: "saving new plant failed",
            data: {},
          });
        }
        return user._id
      }).catch((err)=>{
        throw err
      })
      
    }else {
        res.status(406).send({
          status: "error",
          message: "this plant exists",
          data: {},
        })
      }
  },
  AddSensorData : async function(req,res){
    PlantService.AddSensorData(req)
    .then((message) => {
        res.status(201).send({
        status: "ok",
        message: "add data successful",
        data: {},
        });
    }).catch((message) => {
        res.status(401).send({
        status: "error",
        message: "there isn't any plant with this id",
        data: {},
        });
    });
},
};
