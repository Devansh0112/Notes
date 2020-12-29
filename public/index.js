const getURL = "http://localhost:3000/getNotes";
const addURL = "http://localhost:3000/addNote";
const clearURL = "http://localhost:3000/clear";

const getNotes = function () {
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
        let p = document.createElement("p");
        p.innerHTML = "No notes yet.";
        ul.appendChild(p);
      }
    }
  };
  xhttp1.open("GET", getURL, true);
  xhttp1.send();
};

const addNote = function () {
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
};

const clearNotes = function () {
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
};

function downloadFile() {
  let xhttp3 = new XMLHttpRequest();
  xhttp3.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(this.responseText);
      let csvContent = "data:text/json;charset=utf-8," 
      csvContent += JSON.stringify(data);
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_data.json");
      document.body.appendChild(link); // Required for FF

      link.click();
    }
  };

  xhttp3.open("GET", getURL, true);
  xhttp3.send();
}

getNotes();
