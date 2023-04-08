module.exports = function (schema) {
  // ensure the name is save in lowercase for easier retrieval
  schema.pre('save', async function () {
    const modelName = this.name.toLowerCase();
    this.name = modelName;
  });
};
