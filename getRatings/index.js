module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    // bindings: ratings

    if (req.query.userId) {
        let userId = req.query.userId;

        let userRating=[];
        for (let i of context.bindings.ratings) {
            if (i.userId == userId) {
                userRating.push(i);
            }
        }
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: userRating
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a userId on the query string"
        };
    }
};