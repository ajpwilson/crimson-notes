import { Injectable } from '@angular/core';
import { Note } from '../../interfaces/interfaces';
import { Storage } from "@ionic/storage";

@Injectable()
export class NotesProvider {

  private notes: Note[] = [];

  constructor(public storage: Storage) {}

  saveNote(note: Note) {
    let date = new Date();
    note.id = date.getTime(); // not the best solution

    let tags = (<string>note.tags).split(','); // type assertion
    tags = tags.filter((tag: string) => { return tag.trim() != ''})
    note.tags = tags;

    this.notes.push(note);
    this.storage.set('notesStorage', this.notes) // storing array of notes as a key value pair.
  }

  updateNote(updatedNote: Note){

    this.notes.forEach((note: Note, index: number) => {
      if(note.id === updatedNote.id) {
        this.notes[index] = updatedNote;
      }
    });

    const updatedNotes = this.notes;
    this.notes.concat(updatedNotes);
    this.storage.set('notesStorage', this.notes) // storing array of notes as a key value pair.
  }

  deleteNote(note: Note) {
    let i: number = this.notes.indexOf(note);
    this.notes.splice(i, 1);
    this.storage.set('notesStorage', this.notes) // storing array of notes as a key value pair.
  }

  providerGetNotes() {
    return this.storage.get('notesStorage').then((notesStorage) => { // .get returns a promise, pass a callback function to .then
      this.notes = notesStorage == null ? [] : notesStorage;
      return [...this.notes]; // cloning the array so that the main array is immutable.
    })
  }
}
