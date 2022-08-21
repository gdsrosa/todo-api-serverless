const AWS = require('aws-sdk');
const { errorHandler } = require('../common/helpers');

const TODO_TABLE = process.env.TODO_TABLE;

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.updateTodo = (event, context, callback) => {
  const {
    pathParameters: { id },
    body,
  } = event;

  const datetime = new Date().toISOString();
  const data = JSON.parse(body);

  if (typeof data.todo !== 'string' || typeof data.done !== 'boolean') {
    console.error('Value of todo or done is invalid');
    return;
  }

  const params = {
    TableName: TODO_TABLE,
    Key: {
      id,
    },
    ExpressionAttributeNames: {
      '#todo_text': 'todo',
    },
    ExpressionAttributeValues: {
      ':todo': data.todo,
      ':done': data.done,
      ':updatedAt': datetime,
    },
    UpdateExpression:
      'SET #todo_text = :todo, done = :done, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  dynamoDbClient.update(params, (error, data) => {
    errorHandler(error);

    callback(null, { statusCode: 204, body: JSON.stringify(data.Attributes) });
  });
};
