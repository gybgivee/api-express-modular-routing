// Import data here...
const { errorCode } = require("../../errorCode.js");
const express = require("express");
let { books } = require("../../data.js");
const booksRouter = express.Router();

//root
booksRouter.get("", (request, response) => {
   
    response.status(200).json({books: books});
});

booksRouter.get('/:id', (request, response) => {
    const { id } = request.params;
    const foundBook = books.find(book => book.id ===Number(id));
 
    if (!foundBook) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("book","id")
        })

    }
    response.status(200).json(
        {
            book: foundBook
        }
    )
})

booksRouter.post("", (request, response) => {
    const { title,author,type } = request.body;
    if(!title || !author || !type ){
        return response.status(400).json({
            error: errorCode("400")
        })
    }
    const foundBook = books.find(book => book.title === title);
    if (foundBook) {
        const getMessage = errorCode("409");
        return response.status(409).json({
            error: getMessage("book","title") 
        })

    }
    const id = books.length + 1;
    const newbook = {
        id: id,
        title: title,
        author: author,
        type: type
    }
    books.push(newbook);
    response.status(201).json({ book: newbook });

})
booksRouter.delete("/:id", (request, response) => {
    const { id } = request.params;
    const foundBook = books.find(book => book.id ===Number(id));
 
    if (!foundBook) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("book","id")
        })

    }
    const updatedBooks = books.filter(book => book.id !== Number(id));
    books = [...updatedBooks];
    response.status(200).json({ books: books });
})
booksRouter.patch("/:id", (request, response) => {
    const { id } = request.params;
    const { title ,author,type } = request.body;
    const foundBook = books.find(book => book.id ===Number(id));
 
    if (!foundBook) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("book","id")
        })

    }
    if(!title && !author && !type){
        return response.status(400).json({
            error: errorCode("400")
        })
    }
    if(title) foundBook['title'] = title;
    if(author) foundBook['author'] = author;
    if(type) foundBook['type'] = type;

    const updatedBooks = books.map(book => book.id === Number(id) ? foundBook : book);
    books = [...updatedBooks];
    response.status(200).json({ books: books });
})
booksRouter.put("/:id", (request, response) => {
    const { id } = request.params;
    const { title ,author,type } = request.body;
    const foundBook = books.find(book => book.id ===Number(id));
 
    if (!foundBook) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("book","id")
        })

    }
    if(!title || !author || !type){
        return response.status(400).json({
            error: errorCode("400")
        })
    }
    const updatedbook = {
        id: Number(id),
        title: title,
        author: author,
        type: type
    }
    const updatedBooks = books.map(book => book.id === Number(id) ? updatedbook : book);
    books = [...updatedBooks];
    response.status(200).json({ books: books });
})
module.exports = booksRouter;


// Write routes here...
