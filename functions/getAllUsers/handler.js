const aws = require('aws-sdk')

let dynamodbClientParams = {}

if (process.env.IS_OFFLINE) {
    dynamodbClientParams = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'dummy',
        secretAccessKey: 'dummy'
    }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamodbClientParams)

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
    getAllUsers
}
