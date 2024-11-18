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

const updateUsers = async (event, context) => {

    let userId = event.pathParameters.id;

    const body = JSON.parse(event.body);

    const params = {
        TableName: 'usersTable',
        Key: { pk: userId },
        UpdateExpression: 'set #name = :name, #edad = :edad, #email = :email, #telefono = :telefono',
        ExpressionAttributeNames: { '#name': 'name', '#edad': 'edad', '#email': 'email', '#telefono': 'telefono' },
        ExpressionAttributeValues: 
            {   ':name': body.name,
                ':edad': body.edad,
                ':email': body.email,
                ':telefono': body.telefono
             },
        ReturnValues: 'UPDATED_NEW'
    };

    const res = await dynamodb.update(params).promise();
    console.log(res);
    return {
        statusCode: 200,
        body: JSON.stringify({'User updated': res.Attributes }), 
    };

};

module.exports = {
    updateUsers
}
