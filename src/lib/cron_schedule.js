const cron=require("node-cron")
cron.schedule("* 10 * * * * ",()=>{
    const d=new Date()
    console.log(`at one minutes ${d}`)
})