const { PlantService } = require("../../services/plantService");
const { plants } = require("../../model/plant");
module.exports = {
  createNewPlant : async function(req,res){
    if ((await plants.findOne({ name: req.body.name })) == null) {
        try {
          PlantService.addNewPlant(req);
          res.status(200).send({
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
    }else {
        res.status(406).send({
          status: "error",
          message: "this plant exists",
          data: {},
        })
      }
  },

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

  createNewPlant: async (req, res, next) => {
    const plantName = req.body.name;
    if ((await plants.findOne({ name: plantName })) == null) {
      try {
        PlantService.addNewPlant(req);
        res.status(200).send({
          status: "ok",
          message: "your plant is created",
          data: {},
        });
      } catch {
        res.status(500).send({
          status: "error",
          message: "having problem to save new plant",
          data: {},
        });
      }
    } else {
      res.status(201).send({
        status: "error",
        message: "this plant exists",
        data: {},
      });
    }
  },
};
