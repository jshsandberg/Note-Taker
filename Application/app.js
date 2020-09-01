
const fs = require("fs");

const express = require("express");

const path = require("path");

const app = express();
const PORT = 80;

let notes = require("./db/db.json")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

// const notes = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
//       if (err) throw err;
//   })
//   );
  
  const dbUpdate = (data,res) => {
  fs.writeFile(
      path.join(__dirname, "/db/db.json"),
      JSON.stringify(data),
      err => {
      if (err) throw err;
      res.json("ok")
      }
  );
  };


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));

});



app.get("/api/notes", function(req, res) {
    res.json(notes);
  });
  


  app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    let id = notes.length;
    newNote.id = id + 1;
    notes.push(newNote);
    dbUpdate(notes, res);
    });


    app.delete("/api/notes/:id", (req, res) => {
      let id = req.params.id;
      console.log(id)
      notes = notes.filter(note=> note.id != id);
      dbUpdate(notes, res);
      });

app.get("*", (req,res)=> res.sendFile(path.join(__dirname, "./public/index.html")));

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


