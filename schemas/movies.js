import z from 'zod'

const movieEsc =z.object({
    title: z.string({
        invalid_type_error:'película en modo string',
        required_error:'El titulo de película es requerido'
    }),
    year:z.number().int().min(1900).max(2024),
    director:z.string(),
    duration:z.number().int().positive(),
    rate:z.number().min(0).max(10).default(5.5),
    poster:z.string().url({
        message:'url invalida'
    }),
    genre: z.array(
        z.enum(['Action','Adventure','Comedy','Drama','Fantasy','Horror','Thriller','Sci-Fi','Romance','Crime'])
    )
})

export function validarPelicula(object){
    return movieEsc.safeParse(object);
}

export function validacionparcial(object){
    return movieEsc.partial().safeParse(object);
}

