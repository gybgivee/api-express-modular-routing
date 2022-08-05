const { errorCode } = require("../../errorCode.js");
const express = require("express");
let { users } = require("../../data.js");
const usersRouter = express.Router();

//root
usersRouter.get("", (request, response) => {
    response.status(200).json({users:users});
});

usersRouter.get('/:id', (request, response) => {
    const { id } = request.params;
    const foundUser = users.find(user => user.id ===Number(id));
 
    if (!foundUser) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("User","id")
        })

    }
    response.status(200).json(
        {
            user: foundUser
        }
    )
})

usersRouter.post("", (request, response) => {
    const { email } = request.body;
    if(!email){
        return response.status(400).json({
            error: errorCode("400")
        })
    }
    const foundUser = users.find(user => user.email === email);
    if (foundUser) {
        const getMessage = errorCode("409");
        return response.status(409).json({
            error: getMessage("User","Email") 
        })

    }
    const id = users.length + 1;
    const newUser = {
        id: id,
        email: email
    }
    users.push(newUser);
    response.status(201).json({ user: newUser });

})
usersRouter.delete("/:id", (request, response) => {
    const { id } = request.params;
    const foundUser = users.find(user => user.id ===Number(id));
 
    if (!foundUser) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("User","id")
        })

    }
    const updatedUsers = users.filter(user => user.id !== Number(id));
    users = [...updatedUsers];
    response.status(200).json({ users: users });
})
usersRouter.put("/:id", (request, response) => {
    const { id } = request.params;
    const foundUser = users.find(user => user.id ===Number(id));
 
    if (!foundUser) {
        const getMessage = errorCode("404");
        return response.status(404).json({
            error: getMessage("User","id")
        })

    }
    const { email } = request.body;
    if(!email){
        return response.status(400).json({
            error: errorCode("400")
        })
    }
    const updatedUser = {
        id: Number(id),
        email: email
    }
    const updatedUsers = users.map(user => user.id === Number(id) ? updatedUser : user);
    users = [...updatedUsers];
    response.status(200).json({ users: users });
})

module.exports = usersRouter;
