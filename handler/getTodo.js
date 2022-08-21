const AWS = require('aws-sdk');
const { errorHandler } = require('../common/helpers');

const TODO_TABLE = process.env.TODO_TABLE;

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.getTodo = (event, context, callback) => {
  const params = {
    TableName: TODO_TABLE,
    Key: { id: event.pathParameters.id },
  };

  dynamoDbClient.get(params, (error, data) => {
    errorHandler(error);

    if (data.Item) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data.Item),
      });
    } else {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({ message: 'Todo Not Found' }),
      });
    }
  });
};
