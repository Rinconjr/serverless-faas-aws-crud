const aws = require('aws-sdk')
const randomUUID = require('uuid').v4

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

const createUsers = async (event, context) => {

    const id = randomUUID();

    let userBody = JSON.parse(event.body);

    userBody.pk = id;

    const params = {
        TableName: 'usersTable',
        Item: userBody
    };

    console.log(params.Item);

    const res = await dynamodb.put(params).promise();
    return {
        statusCode: 201,
        body: JSON.stringify( {'User created': params.Item }), 
    };

};

module.exports = {
    createUsers
}
