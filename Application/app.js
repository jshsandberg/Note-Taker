
const fs = require("fs");

const express = require("express");

const path = require("path");

const app = express();
const PORT = 80;

const notes = require("./db/db.json") || []

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));

});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));


});

app.get("/savednotes", function(req, res) {
  res.sendFile(path.join(__dirname, "savednotes.html"));


});

app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });
  


app.post("/api/notes", function(req, res) {

  var newNotes = req.body;

  console.log(newNotes);

  notes.push(newNotes);
  fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
    if (err) 
    throw error; 
    res.json(newNotes);
  } )
  
});

app.delete("/api/notes/1", function(req, res) {
  fs.readFile("./db/db.json", 'utf8', function (err,data) {
    var formatted = data.replace(/This is the old line/g, 'This new line replaces the old line');
fs.writeFile("your file", formatted, 'utf8', function (err) {
    if (err) return console.log(err);
 });
});
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


