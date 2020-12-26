const getURL = "http://localhost:3000/getNotes";
const addURL = "http://localhost:3000/addNote";
const clearURL = "http://localhost:3000/clear";

getNotes();

function getNotes() {
  let ul = document.getElementById("noteList");
  ul.innerHTML = "";

  const xhttp1 = new XMLHttpRequest();
  xhttp1.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(this.responseText);
      if (data.length > 0) {
        data.forEach(function (item) {
          let li = document.createElement("li");
          li.innerHTML = item.Note;
          ul.appendChild(li);
        });
      } else {
          let p = document.createElement('p');
          p.innerHTML = 'No notes yet.';
          ul.appendChild(p);
      }
    }
  };
  xhttp1.open("GET", getURL, true);
  xhttp1.send();
}

function addNote() {
  let noteInput = document.getElementById("noteInput");
  let warningText = document.getElementById("warningText");
  if (noteInput.value === "") {
    warningText.innerHTML = "Please add some text before submitting.";
    setTimeout(() => {
      warningText.innerHTML = "";
    }, 4000);
  } else {
    warningText.innerHTML = "";
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        warningText.innerHTML = "Successfully added!";
        setTimeout(() => {
          warningText.innerHTML = "";
        }, 4000);
        getNotes();
      }
    };
    xhttp.open("POST", addURL, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify({ content: noteInput.value });
    xhttp.send(data);
  }

  noteInput.value = "";
}

function clearNotes() {
  let cm = document.getElementById("clearMessage");
  const xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      cm.innerHTML = "Notes Cleared Successfully.";
      setTimeout(() => {
        cm.innerHTML = "";
      }, 4000);
      getNotes();
    }
  };
  xhttp2.open("GET", clearURL, true);
  xhttp2.send();
}
