const { errorCode } = require("../../errorCode.js");
const express = require("express");
let { films } = require("../../data.js");
const filmsRouter = express.Router();

//root
filmsRouter.get("", (request, response) => {
    let showFilms = [...films];
    if(request.query.director){
        showFilms = films.filter(film=>film.director === request.query.director)
        
    }
    response.status(200).json({films: showFilms});
});

filmsRouter.get('/:id', (request, response) => {
    const { id } = request.params;
    const foundFilm = films.find(film => film.id ===Number(id));
 
    if (!foundFilm) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("Film","id")
        })

    }
    response.status(200).json(
        {
            film: foundFilm
        }
    )
})

filmsRouter.post("", (request, response) => {
    const { title ,director } = request.body;
    if(!title || !director){
        return response.status(400).json({
            error: errorCode("400")
        })
    }
    const foundFilm = films.find(film => film.title === title);
    if (foundFilm) {
        const getMessage = errorCode("409");
        return response.status(409).json({
            error: getMessage("Film","title") 
        })

    }
    const id = films.length + 1;
    const newFilm = {
        id: id,
        title: title,
        director: director
    }
    films.push(newFilm);
    response.status(201).json({ film: newFilm });

})
filmsRouter.delete("/:id", (request, response) => {
    const { id } = request.params;
    const foundFilm = films.find(film => film.id ===Number(id));
 
    if (!foundFilm) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("Film","id")
        })

    }
    const updatedfilms = films.filter(film => film.id !== Number(id));
    films = [...updatedfilms];
    response.status(200).json({ films: films });
})
filmsRouter.patch("/:id", (request, response) => {
    const { id } = request.params;
    const { title ,director } = request.body;
    const foundFilm = films.find(film => film.id ===Number(id));
 
    if (!foundFilm) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("Film","id")
        })

    }
    if(!title && !director){
        return response.status(400).json({
            error: errorCode("400")
        })
    }
    if(title) foundFilm['title'] = title;
    if(director) foundFilm['director'] = director;

    const updatedFilms = films.map(film => film.id === Number(id) ? foundFilm : film);
    films = [...updatedFilms];
    response.status(200).json({ films: films });
})
filmsRouter.put("/:id", (request, response) => {
    const { id } = request.params;
    const { title ,director } = request.body;
    const foundFilm = films.find(film => film.id ===Number(id));
 
    if (!foundFilm) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("Film","id")
        })

    }
    if(!title || !director){
        return response.status(400).json({
            error: errorCode("400")
        })
    }
    const updatedFilm = {
        id: Number(id),
        title: title,
        director: director
    }
    const updatedFilms = films.map(film => film.id === Number(id) ? updatedFilm : film);
    films = [...updatedFilms];
    response.status(200).json({ films: films });
})
module.exports = filmsRouter;
