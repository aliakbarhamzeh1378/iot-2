const {MasterService}=require("../src/services/masterService")
describe("test for CRUD master",function(){
    it("add new master to db",async function(){
        let newMaster=await MasterService.createMaster({
            name:m01,
            uer_id:"sfggv345ybdgyu"
        })
        assert(!newMaster.isNew);

    })
})