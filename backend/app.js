// load .env file here
require('dotenv').config();

const { createApp } = require('./lib');

const PORT = process.env.PORT || 5500;

async function main() {
  try {
    const app = await createApp();


    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(`[app:main] could not create app: ${error.message}`);
    process.exit(1);
  }
}

module.exports = main();
