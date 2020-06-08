import { Injectable } from '@angular/core';
import { Note } from '../../interfaces/interfaces';
import { Storage } from "@ionic/storage";

@Injectable()
export class NotesProvider {

  notes: Note[] = [];

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
    this.storage.set('notesStorage', this.notes)
  }

  deleteNote(note: Note) {
    let i: number = this.notes.indexOf(note);
    this.notes.splice(i, 1);
    this.storage.set('notesStorage', this.notes);
  }

  providerGetNotes() {
    /* A promise is an object that may produce a single value some time in the future.
    Three possible states of a promise: fulfilled, rejected, or pending.
    A promise is settled if it's not pending, once settled it can not be resettled. */
    return this.storage.get('notesStorage').then((notesStorage) => { // .get returns a promise, passing a callback function to .then
      this.notes = notesStorage;
      return this.notes;
    })
  }
}
