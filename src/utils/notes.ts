const NOTES_KEY = "timeflow_notes";

export function loadNote() {
  return localStorage.getItem(NOTES_KEY) || "";
}

export function saveNote(note: string) {
  localStorage.setItem(
    NOTES_KEY,
    note
  );
}