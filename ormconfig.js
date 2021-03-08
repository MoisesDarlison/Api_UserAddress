require('dotenv').config();
const { DB_TYPE,NODE_ENV, POSTGRES_DB_NAME_TEST, DB_HOSTNAME, DB_PORT, DB_USER, DB_PASSWORD, POSTGRES_DB_NAME } = process.env;


module.exports = {
    "type": DB_TYPE,
    "host": DB_HOSTNAME,
    "port": Number(DB_PORT),
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": NODE_ENV === "test" ? POSTGRES_DB_NAME_TEST : POSTGRES_DB_NAME,
    "migrations": ["./src/migrations/**.ts"],
    "entities": ["./src/models/**.ts"],
    "cli": {
        "migrationsDir": "./src/migrations"
    }
}
