//this is entry point for application.
//this is what we fire to run the application

var express= require('express');
var app = express();
var mysql=require('mysql');
var todocontroller=require('./controllers/todo_controller.js');
//to set the view engine=  ejs
var connection=mysql.createConnection({
   host: "127.0.0.1",
   user: "root",
   password: "awoesomedude",
   database: "todo_app"
});
connection.connect(function(error){
  if(error)
   console.log("there is a connection problem");
  else {
     console.log("succesful connection");
  }
})




app.set('view engine','ejs');
//to get express.static middleware for the static files
//app.use('/assets',express.static('./public')) route is pecified
app.use(express.static('./public'));
todocontroller(app,connection);
//now this will be used for any reference to any static
//file in the code,not only /asset rout
//now we listen
app.listen(3000);
console.log('you are listening to port 3000');
