const AWS = require('aws-sdk');
const uuid = require('uuid');
const { errorHandler } = require('../common/helpers');

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.createTodo = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.todo !== 'string') {
    console.error('validation error');
    return;
  }

  const params = {
    TableName: TODO_TABLE,
    Item: {
      id: uuid.v1(),
      todo: data.todo,
      done: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamoDbClient.put(params, (error, data) => {
    errorHandler(error);

    callback(null, {
      statusCode: 201,
      body: JSON.stringify(data.Item),
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Create TODO endpoint' }),
  };
};
