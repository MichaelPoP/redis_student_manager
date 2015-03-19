var express = require("express");
app = express();
app.set("view engine", "ejs");
redis = require("redis");
client = redis.createClient();
methodOverride = require("method-override");
bodyParser = require("body-parser");
//MIDDLEWARE
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//to include css/js/imgs
app.use(express.static(__dirname + '/public'));
// ------------------------------------------------

app.get("/", function(req, res){
  client.smembers("students", function(err, students){
    res.render("index", {students:students}); 
  });
  // res.json();  
});

app.post("/create", function(req, res){
  var student = req.body.student;
  client.sadd("students", student);
  res.redirect("/");
});

//REMOVE ONE
app.delete("/remove/:student", function(req, res) {
 
  client.srem("students",req.params.student);
  res.redirect("/");
   
});

//REMOVE ALL
app.delete("/remove", function(req, res) {
 
  client.del("students");
  res.redirect("/");
  
});






app.listen(3000, function(){
  console.log("Server Starting");
});




