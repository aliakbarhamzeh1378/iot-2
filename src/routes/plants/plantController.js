let { PlantService } = require("../../services/plantService");

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
              res.status(500).send({
                status: "error",
                message: "saving new plant failed",
                data: {},
              });
            }
        }else {
            res.status(201).send({
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
    }
};