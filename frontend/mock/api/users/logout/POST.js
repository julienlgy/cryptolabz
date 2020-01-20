module.exports = (request, response) => {
    if (request.body.username === undefined
        || request.body.password === undefined) {
        return response.status(400).send({
            "msg": "Bad request"
        });
    }
    
    return response.status(200).send({
        "msg": "Identified."
    });
}