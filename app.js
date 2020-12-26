const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

// middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));


// Port number
const PORT = 3000;

let notes = [];

// routes
app.get('/getNotes', function(req,res){
    fs.readFile('./notes.json', (err,data) => {
        if (err) console.log(err);
        notes = JSON.parse(data);
        res.json(notes);
    });
});

app.get('/clear', function(req, res){
    notes = [];
    fs.writeFile('./notes.json', JSON.stringify(notes), (err)=>{
        res.end();
    });
});

app.post("/addNote", function (req, res) {
  let date = new Date().toISOString().split("T")[0];
  let data = {
    Date: date,
    Note: req.body.content,
  };
  notes.push(data);
  fs.writeFile('./notes.json', JSON.stringify(notes), (err)=>{
      if (err) console.log('Error while writing to file...');
      else res.end();
  });
});

// starting server
app.listen(PORT, function (){
    console.log(`Connected to port ${PORT}`);
});