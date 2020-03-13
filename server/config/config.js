require('dotenv').config()
module.exports = {
  development: {
    username: process.env.DB_user,
    password: process.env.DB_pass,
    database: "kanban",
    host: "localhost",
    dialect: "postgres"
  },
  production: {
    username: "cqrsofvzfqdcuf",
    password: "3e7de84193c8875801e3fab31456eb5e6f6f7abe45bd7b731ebff32efbc8a47e",
    database: "da4qcdigevdq7j",
    host: "ec2-34-200-101-236.compute-1.amazonaws.com",
    dialect: "postgres",
  }
}
