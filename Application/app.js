
const fs = require("fs");

const express = require("express");

const path = require("path");

const app = express();
const PORT = 80;

const notes = require("./db/db.json") || []

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

const dbNotes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
      if (err) throw err;
  })
  );
  
  const dbUpdate = dbNotes => {
  fs.writeFileSync(
      path.join(__dirname, "/db/db.json"),
      JSON.stringify(dbNotes),
      err => {
      if (err) throw err;
      }
  );
  };

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));

});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));


});


app.get("/api/notes", function(req, res) {
    return res.json(dbNotes);
  });
  


  app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    let id = dbNotes.length;
    newNote.id = id + 1;
    dbNotes.push(newNote);
    dbUpdate(dbNotes);
    return res.json(dbNotes);
    });


    app.delete("/api/notes/:id", (req, res) => {
      let id = req.params.id;
      delete dbNotes[id - 1];
      var filter = dbNotes.filter(function (el) {
        return el != null;
      });
      dbUpdate(filter);
      res.send(dbNotes);
      });


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


