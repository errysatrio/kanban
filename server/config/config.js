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
    username: "lpkreqpecojlpn",
    password: "1bf8bf0840f54ec73f0da118191f1102382eb9ef124a857b8f03e20a08e9180e",
    database: "dfkvc887pussmk",
    host: "ec2-34-200-101-236.compute-1.amazonaws.com",
    dialect: "postgres",
  }
}
