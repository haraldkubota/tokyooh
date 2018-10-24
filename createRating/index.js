
module.exports = async function (context, req) {

    const rp = require('request-promise-native');
    const uuidv4 = require('uuid/v4');
    
    context.log('JavaScript HTTP trigger function processed a request.');

    // Input params: GET userId, productId
    // Verify both are valid

    if (req.body.userId && req.body.productId && req.body.locationName && req.body.userNotes) {
        let userId=req.body.userId;
        let productId=req.body.productId;
        let rating=req.body.rating;
        let locationName = req.body.locationName;
        let userNotes = req.body.userNotes || "";

        let productList=context.bindings.products;
        let timeStamp=new Date().toJSON().toString();

        if (!(rating===undefined) && Number.isInteger(rating)
            && rating>=0 && rating<=5) {

            // context.log(`Got userId ${userId} and productId ${productId}, rating ${rating}.`);
            // context.log(context.bindings.products);
            // context.log("type of productList = "+typeof productList);
        
            let foundProduct=false;
            for (let i of productList.products) {
                if (i.productId === productId) {
                    foundProduct=true;
                    context.log("Product match!");
                }
            }
            if (foundProduct) {
                // Check user

                try {
                        var usrOptions = {
                            uri: 'https://serverlessohlondonuser.azurewebsites.net/api/GetUser',
                            qs: {
                                userId: userId // -> uri + '?key=value'
                            },
                            headers: {
                                'User-Agent': 'Request-Promise'
                            },
                            json: true // Automatically parses the JSON string in the response
                        };
                        user = await rp(usrOptions);
                        validUser = true;
                        console.log('User name', user.userName);
                    }
                    catch(err) {
                        statusCode = 422
                        bodyStr+='Invalid UserId : ' + req.body.userId+'\n'
                    }
                // write to DB
                let resultDoc={
                    id: uuidv4(),
                    userId: userId,
                    productId: productId,
                    timeStamp: timeStamp,
                    locationName: locationName,
                    rating: rating,
                    userNotes: userNotes
                };
                context.bindings.ratingDoc=resultDoc;
                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: resultDoc
                };
            }
        }
    }
    else {
        context.res = {
            status: 400,
            body: "I did not like something."
        };
    }
};