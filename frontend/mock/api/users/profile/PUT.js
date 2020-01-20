module.exports = (request, response) => {
    if (request.body.id === undefined) {
        return response.status(400).send({
            "msg": "Bad request"
        });
    }
    
    return response.status(200).send({
        "msg": "Profile updated.",
        "id": 43,
        "email": request.body.email,
        "username": request.body.username,
        "firstname": request.body.firstname,
        "lastname": request.body.lastname
    });
}