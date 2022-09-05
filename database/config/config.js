module.exports={
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "bfaa2298072048",
    "password": "606d2e90",
    "database": "heroku_3ae70eb05780936",
    "host": "us-cdbr-east-06.cleardb.net",
    "dialect": "mysql"
  }
}
