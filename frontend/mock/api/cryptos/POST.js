module.exports = (request, response) => {
    if (request.body.name === undefined
        || request.body.image_url === undefined) {
        return response.status(400).send({
            "msg": "Bad request"
        });
    }
    else if (request.body.id === 42) {
        return response.status(401).send({
            "msg": "Unauthorzied"
        });
    }
    
    return response.status(201).send({
        "id": 43,
        "name": request.body.name,
        "image_url": request.body.image_url
    });
}