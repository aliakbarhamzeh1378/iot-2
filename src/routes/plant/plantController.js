const { PlantService } = require("../../services/plantService");
const { plants } = require("../../model/plant");
module.exports = {
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
          data: {},
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
