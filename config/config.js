require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    // username: process.env.PROD_DB_USERNAME,
    // password: process.env.PROD_DB_PASSWORD,
    // database: process.env.PROD_DB_DATABASE,
    // host: process.env.PROD_DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
