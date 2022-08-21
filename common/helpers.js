module.exports.errorHandler = (error) => {
  if (error) {
    console.error(error);
    callback(new Error(error));
    return;
  }
};
