const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'sql176.main-hosting.eu',
    user: 'u481485510_big',
    password: 'cnbm1001',
    database: 'u481485510_bigdb',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;