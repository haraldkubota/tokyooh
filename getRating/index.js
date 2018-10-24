module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    // bindings: ratings

    if (req.query.ratingId) {

        let rating=undefined;
        for (let i of context.bindings.ratings) {
            if (i.id == req.query.ratingId) {
                rating=i;
                break;
            }
        }
        if (rating !== undefined) {
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: rating
            };
        } else {
            context.res={
                status: 404,
                body: "No such rating."
            };
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a ratingId in the query string"
        };
    }
};