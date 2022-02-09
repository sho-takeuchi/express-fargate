module.exports = {
    pg_client: function () {
        const { Client } = require('pg')
        console.log(process.env);
        const client = new Client({
            // user: process.env.DB_USER,
            // host: process.env.DB_HOST,
            // // password: process.env.DB_PASSWORD,
            // port: process.env.DB_PORT,
            // database: process.env.DB_NAME
        })
        return client
    },
};