const express=require("express")
const pc=require("picocolors")
const crypto=require("node:crypto")


const movies=require('./movies.json')
const { validarPelicula, validacionparcial } = require("./schemas/movies")
const { error } = require("node:console")
const app=express()

app.disable("x-powered-by")



app.use(express.json());

app.get('/movies',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    let { genero } = req.query
    if(genero){
        const filtro_genero=movies.filter(movie=>
            movie.genre.some(g=>g.toLowerCase() == genero.toLowerCase())
        )
        return res.json(filtro_genero)
    }
    res.json(movies)
})

app.get('/movies/:id',(req,res)=>{
    const {id} =req.params
    const movie=movies.find(movie=>movie.id===id)
    if(movie) return res.json(movie)
    res.status(404).json({message:'Movie not found'})
})

app.post('/movies',(req,res)=>{
    const result=validarPelicula(req.body)
    if(result.error){
        return res.status(400).json({error:JSON.parse(result.error.message)})
    }
    const newMovie={
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})
app.patch('/movies/:id', (req, res) => {
    const result = validacionparcial(req.body)
    if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
    }
    const updateMovie = {
    ...movies[movieIndex],
    ...result.data
    }
    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
})
app.use((req,res)=>{
    res.send("404");
})
const port=process.env.PORT ?? 1234;
app.listen(port,()=>{
    console.log(pc.bgGreen(`Servidor abierto en puerto: http://localhost:${port}`));
})

