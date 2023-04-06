let fs=require("fs");
const readline=require("readline")
const inputs=[];
for (let i=0;i<4;i++){
    const rl=readline.createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt:"Enter a sentence:"
    })
    rl.prompt();
    rl.on("line",(line)=>{
        inputs.push(line)
    })
}
console.log(inputs);
// let writer=fs.createWriteStream("./textjs.js",{
//     flags:"w"
// })




// if(writer.write("if (temp>30){'fan on'}")){
//     console.log("file added")
// }
// else{
//     console.log("no")
// }
