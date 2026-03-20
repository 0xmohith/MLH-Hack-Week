const notesList = document.getElementById("notesList");
const addBtn = document.getElementById("addBtn");
const noteEditor = document.getElementById("noteEditor");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const saveNoteBtn = document.getElementById("saveNote");
const exportBtn = document.getElementById("exportBtn");

let notes = [];

chrome.storage.local.get(["notes"], (result) => {
  notes = result.notes || [];
  renderNotes();
});

function saveNotes() {
  chrome.storage.local.set({ notes });
}

function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const tab = document.createElement("div");
    tab.className = "note-tab";

    const title = document.createElement("h4");
    title.textContent = note.title;

    const content = document.createElement("div");
    content.className = "note-content";
    content.textContent = note.content;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "🗑️";

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    });

    tab.addEventListener("click", () => {
      tab.classList.toggle("active");
    });

    tab.appendChild(title);
    tab.appendChild(delBtn);
    tab.appendChild(content);
    notesList.appendChild(tab);
  });
}

addBtn.addEventListener("click", () => {
  noteEditor.classList.toggle("hidden");
});

saveNoteBtn.addEventListener("click", () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (!title || !content) return;

  notes.push({ title, content });
  saveNotes();
  renderNotes();

  noteTitle.value = "";
  noteContent.value = "";
  noteEditor.classList.add("hidden");
});

exportBtn.addEventListener("click", () => {
  let text = "";
  notes.forEach(n => {
    text += `Title: ${n.title}\n${n.content}\n\n`;
  });

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quickies_notes.txt";
  a.click();
});