# Books API Project

This project is a backend application built with Express.js, providing functionality for a bookstore api.

## Getting Started

Clone the repository to your local machine.
Install dependencies using `npm install`.
You don't need to create .env file - note: created it and uploaded the keys (it is for the example of use)
Start the server:
`npm start`

Alternatively, you can run the server in development mode using:
`npm run dev`

**Important Notes**

Environment Variables: This project uses environment variables for configuration.
Ensure that you have a .env file in the root directory of the project and populated it with the required variables.
Redis Caching: The application utilizes Redis for caching.
If Redis is not installed locally on your machine, the server will try once and failover - caching functionality will be disabled.

## Testing
In order to run the test suites, you should have local mongo running.
in order to make transitions configure in mongo - replicas

steps:
1. `vi /usr/local/etc/mongod.conf`
2. add the following
   `replication:`
   `replSetName: "rs0"`
3. connect to mongo - `mongo`
4. `rs.initiate()`
5. `verify - rs.status()`
6. restart mongo - `brew services restart mongodb-community`

`npm test` - to run the tests

## Dependencies

   "@joi/date": "^2.1.1",
    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "joi": "^17.13.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.3.2",
    "object-hash": "^3.0.0",
    "pino": "^9.0.0",
    "redis": "^4.6.13"

## License

This project is licensed under the MIT License. See the LICENSE file for details.
