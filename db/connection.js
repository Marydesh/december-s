const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Berkeley2023!',
      database: 'employees_db'
    },
    console.log(`Connected to the movie_db database.`)
  );

  connection.connect(function(err){
    if (err) throw err
  })

  module.exports = connection