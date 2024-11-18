const aws = require('aws-sdk')

let dynamodbClientParams = {}

if (process.env.IS_OFFLINE) {
    dynamodbClientParams = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'dummy',  // needed if you don't have aws credentials at all in env
        secretAccessKey: 'dummy' // needed if you don't have aws credentials at all in env
    }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamodbClientParams)

const getUsers = async (event, context) => {

    let userId = event.pathParameters.id;

    const params = {
        ExpressionAttributeValues: { ':pk': userId },
        KeyConditionExpression: 'pk = :pk',
        TableName: 'usersTable',
    };

    const res = await dynamodb.query(params).promise();
    console.log(res);
    return {
        statusCode: 200,
        body: JSON.stringify(res.Items), 
    };

};

const getAllUsers = async (event, context) => {

    const params = {
        TableName: 'usersTable',
    };

    const res = await dynamodb.scan(params).promise();
    console.log(res);
    return {
        statusCode: 200,
        body: JSON.stringify(res.Items), 
    };

};

module.exports = {
    getUsers,
    getAllUsers
}
