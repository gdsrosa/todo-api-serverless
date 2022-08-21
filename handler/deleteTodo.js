const AWS = require('aws-sdk');
const { errorHandler } = require('../common/helpers');

const TODO_TABLE = process.env.TODO_TABLE;

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.deleteTodo = (event, context, callback) => {
  const params = {
    TableName: TODO_TABLE,
    Key: { id: event.pathParameters.id },
  };

  dynamoDbClient.delete(params, (error, data) => {
    errorHandler(error);

    callback(null, {
      statusCode: 204,
      body: JSON.stringify({ data: 'Todo Successfully Deleted' }),
    });
  });
};
