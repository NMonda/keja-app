module.exports = {
    port: process.env.PORT || 5000,
    db: {
      uri: 'mongodb+srv://nmonda:1234@mongo-nm-dev.6nph5p6.mongodb.net/test',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  };
  