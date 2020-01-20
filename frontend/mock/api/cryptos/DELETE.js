module.exports = (request, response) => {
    if (request.body.id === undefined) {
        return response.status(400).send({
            "msg": "Bad request."
        });
    }
    else if (request.body.id === 143) {
        return response.status(404).send({
            "msg": "Not found."
        });
    }
    else if (request.body.id === 42) {
        return response.status(401).send({
            "msg": "Unauthorzied"
        });
    }
    
    return response.status(204).send({
        "msg": "Deleted successfully."
    });
}