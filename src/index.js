import app from "./app.js";
import { sequelize } from "./database/database.js";

//import './models/Project.js'
//import './models/Task.js'

async function main() {
  try {
    await sequelize.sync( { force: false }); //{force: true} para reiniciar a base de dados 
    console.log("Connection has been established successfully.");
    app.listen(4000);
    console.log("Server is running on port 4000");
  } catch (error) {
    console.error("Unable to connect to the database");
  }
}

main();
