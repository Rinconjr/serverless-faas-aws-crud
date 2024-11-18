import boto3, json, os

client = boto3.resource('dynamodb')

IS_OFFLINE = os.getenv('IS_OFFLINE')
if IS_OFFLINE:
    boto3.Session(
        aws_access_key_id="dummy",
        aws_secret_access_key="dummy",
    )
    client = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

table = client.Table('usersTable')


def deleteUsers(event, context):
    user_id = event['pathParameters']['id']

    try:
        result = table.delete_item(
            Key={'pk': user_id},
            ReturnValues='ALL_OLD'
        )

        if 'Attributes' in result:
            body = json.dumps({'message': f"User {user_id} deleted successfully"})
            status_code = 200
        else:
            body = json.dumps({'message': f"User {user_id} does not exist"})
            status_code = 404

    except Exception as e:
        body = json.dumps({'message': f"An error occurred: {str(e)}"})
        status_code = 500

    response = {
        "statusCode": status_code,
        "body": body
    }

    return response
