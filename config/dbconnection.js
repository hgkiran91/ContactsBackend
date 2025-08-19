// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host: 'localhost', // Your MySQL host
//     user: 'root',      // Your MySQL username
//     password: 'HG91@bubbly', // Your MySQL password
//     database: 'sampledb' // Your database name
// })

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database:', err.stack);
//         return;
//     }
//     console.log('Connected to MySQL database as ID:', connection.threadId);
// })

// module.exports = connection;

const { Sequelize } = require('sequelize');
const dotenv = require("dotenv").config();

const sequelize = new Sequelize('mycontacts', process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ DB connected successfully!');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;