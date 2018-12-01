module.exports = {
    "development": {
      "username": "root",
      "password": process.env.SEQUELIZE_PASSWORD,
      "database": "white_elephant_db",
      "host": "127.0.0.1",
      "port": 3306,
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": "IHAZUnicorn",
      "database": "white_elephant_db",
      "host": "127.0.0.1",
      "port": 3306,
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": "IHAZUnicorn",
      "database": "white_elephant_db",
      "host": "127.0.0.1",
      "port": 3306,
      "dialect": "mysql"
    }
  }
  