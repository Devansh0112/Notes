const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

// middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


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
    console.log('Notes sent successfully...');
});

app.get('/clear', function(req, res){
    notes = [];
    fs.writeFile('./notes.json', JSON.stringify(notes), (err)=>{
        res.end();
        console.log('Cleared the notes successfully...');
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
      else {res.end();
    console.log('Notes added successfully...');}
  });
});

// starting server
app.listen(PORT, function (){
    console.log(`Connected to port ${PORT}`);
});