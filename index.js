const os=require("node:os")
const fs=require("node:fs/promises")
const path=require("node:path")
const pc=require("picocolors")
const http=require("node:http")

const port=process.env.PORT ?? 3000;

const server= http.createServer((req,res)=>{
    if(req.url=="/"){
        res.statusCode=200;
        res.setHeader('Content-type','text/html; charset=utf-8')
        res.end("<h1>Hello word neeeeeñoooo...</h1>")
        console.log("request true : ", req.url);
    }
    else if(req.url=='/imagen.jpg'){
        res.setHeader('content-type','image/jpg')
        fs.readFile('./imagen.jpg')
        .then((file)=>{
            res.end(file)
        })
        .catch((err)=>{
            res.statusCode=500;
            res.end("Internal server error ",err);
        })

    }
    else if(req.url=="/contacto"){
        res.statusCode=200;
        res.setHeader('Content-type','text/html; charset=utf-8')
        res.end("<h1>Estas en el area de contacto</h1>")
        console.log("request true : ", req.url); 

    }else{
        res.statusCode=404;
        res.end("Error al cargar la pagina")
    }



    
    

})
server.listen(port,()=>{
    console.log(pc.bgGreen("Server listening"));
})