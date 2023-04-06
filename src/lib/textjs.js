let fs=require("fs");
const readline=require("readline")
const inputs=[];
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

const attr=()=>{
    return new Promise((resolve,reject)=>{
        rl.setPrompt("enter attribute");
        rl.prompt()
        rl.on("line",(line)=>{
            console.log(line);
            rl.close()
        })
    })
  
}

const main=async()=>{
    await attr()
}

console.log(main())


// let writer=fs.createWriteStream("./textjs.js",{
//     flags:"w"
// })


// if(writer.write("if (temp>30){'fan on'}")){
//     console.log("file added")
// }
// else{
//     console.log("no")
// }
