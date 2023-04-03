let fs=require("fs");
let writer=fs.createWriteStream("./textjs.js",{
    flags:"w"
})
if(writer.write("if (temp>30){'fan on'}")){
    console.log("file added")
}
else{
    console.log("no")
}
