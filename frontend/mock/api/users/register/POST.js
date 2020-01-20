module.exports = (request, response) => {
    if (request.body.email === undefined
        || request.body.username === undefined
        || request.body.firstname === undefined
        || request.body.lastname === undefined) {
        return response.status(400).send({
            "msg": "Bad request"
        });
    }
    
    return response.status(201).send({
        "id": 43,
        "email": request.body.email,
        "username": request.body.username,
        "firstname": request.body.firstname,
        "lastname": request.body.lastname
    });
}