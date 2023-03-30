const express = require("express");
const { open } = require("sqlite"); //used to open connection to database from the server
const sqlite3 = require("sqlite3"); //driver class is in sqlite3
const path = require("path");
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
//connect to the database and server from NodeJS
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT * FROM book ORDER BY book_id;
    `;
  const booksArray = await db.all(getBooksQuery); //db.all returns a promise object //all is a method to execute sql query from node JS
  //sqlite provides different methods to execute the sql queries from nodeJS
  response.send(booksArray);
});
