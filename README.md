## Keja-App

![DEPLOYMENT STATUS](https://github.com/NMonda/keja-app/actions/workflows/jobs.yml/badge.svg)
### Project Description
The purpose of this project is to create a smart real estate platform that will simplify the process of house hunting and selling for both buyers and sellers. The current process of buying or selling a house is often time-consuming and complex, requiring multiple visits to properties, lengthy negotiations, and paperwork. The smart real estate platform aims to streamline this process and provide an efficient and user-friendly solution.

The goals of the project are to:

Provide a comprehensive database of properties for sale or rent that is easily searchable by location, price, and features.

Enable buyers to schedule virtual property tours, reducing the need for physical visits and saving time.

Provide an automated property valuation tool that will give sellers a fair and accurate estimate of the value of their property.

Allow buyers and sellers to communicate directly through the platform, simplifying the negotiation process and reducing the need for intermediaries.

Provide secure and efficient online documentation and payment options, reducing the need for physical paperwork.


## Installation

### Backend
The backend runs on Node.js. The following pre-requisites must be met before attempting to run the backend server on your local environment.

**Prerequisites**

Ensure the following technologies / tools are installed on your computer.
- [Node.js](https://nodejs.org/en).
- [Yarn](https://yarnpkg.com/). Please note that this can be replaced with NPM (below), but is far more effective than NPM. This can be installed with NPM: `sudo npm install -g yarn`.
- [NPM](https://docs.npmjs.com/about-npm). 
- [MongoDB](https://www.mongodb.com/docs/manual/installation/).

**Setup backend app**

Once the above tools have been successfully installed, run the following commands to setup the backend app.

```bash
# change into the backend directory
cd backend

# install application dependencies
yarn install

# if YARN is not installed, then use NPM to install the dependencies
npm install
```

**Environment Variables**

Run the command below to create a `.env` file inside the `backend` workspace.

```bash
cp .env.sample .env
```
#### Running dev server
Start the backend server with: `yarn server` (or again if you'd prefer NPM over YARN, then start the server with `npm run server`).

Visit `http://localhost:5500` or `http://localhost:5500/heartbeat` on your preferred browser to confirm that the server runs successfully. The response should be:
```json
{
  "status": "OK"
}
```

#### Running tests
The application has an automated pipeline that runs backend specs on every code push. To make sure your new changes didn't break anything, run tests before pushing your code.

**Test command**

```bash
yarn test

# or using NPM
npm run test
```

Ensure you add more tests once you make any code changes.


#### Running backend linter

The same automated pipeline will run your code against ESLINT. If there are any styling violations, the `backend_linter` Job will fail. Ensure you run the linter command successfully, and fix any violations found before pushing your code.

**Linter commands**

```bash
# to check your code against any styling violations
yarn lint

# or for NPM Users
npm run lint

# TO AUTOMATICALLY FIX, fixable styling violations found,
yarn lint:fix

# or NPM again
npm run lint:fix
```
 
Please note, that `yarn lint:fix` may not fix all styling violations and maybe upon you to fix the remaining ones manually.
