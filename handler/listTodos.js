const AWS = require('aws-sdk');
const { errorHandler } = require('../common/helpers');

const TODO_TABLE = process.env.TODO_TABLE;

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.listTodos = (event, context, callback) => {
  const params = {
    TableName: TODO_TABLE,
  };

  dynamoDbClient.scan(params, (error, data) => {
    errorHandler(error);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    });
  });
};
