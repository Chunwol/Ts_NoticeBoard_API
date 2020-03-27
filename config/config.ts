import 'dotenv/config'
const env = process.env;
interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    operatorsAliases: boolean;
}
exports.development =  <DatabaseConfig>{
  "username": env.DB_ID,
  "password": env.DB_PW,
  "database": "project9",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": false
};