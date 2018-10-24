module.exports = async function (context, req) {

    // We need both name and task parameters.
    if (req.query.name && req.query.task) {

        // Set the output binding data from the query object.
        // context.bindings.ratingDoc = req.query;
        let productList=context.bindings.products;

        //context.log(`Got userId ${userId} and productId ${productId}.`);
        // context.log(context.bindings.products);
        context.log("type of products = "+typeof context.bindings.products);
        context.log("type of productList = "+typeof productList);

        //context.log("productList:");
        //context.log(context.bindings.products);

        for (let i of productList.products) {
            context.log(`Item ${i}.productName=${i.productName}`);
            if (i.productName === req.query.name) {
                context.log("Match!");
            }
        }
        // Success.
        context.res = {
            status: 200
        };
    }
    else {
        context.res = {
            status: 400,
            body: "The query options 'name' and 'task' are required."
        };
    }
};