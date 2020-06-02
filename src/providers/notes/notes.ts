import { Injectable } from '@angular/core';
import { Note } from '../../interfaces/interfaces';

@Injectable()
export class NotesProvider {

  private notes: Note[] = [];
  private updatedNotes: Note[] = [];

  constructor() {}

  saveNote(note: Note) {
    let date = new Date();
    note.id = date.getTime(); // not the best solution
    this.notes.push(note);
  }

  updateNote(updatedNote: Note){

    this.notes.forEach((note: Note, index: number) => {
      if(note.id === updatedNote.id) {
        this.notes[index] = updatedNote;
      }
    });

    const updatedNotes = this.notes;
    this.notes.concat(updatedNotes);
  }

  providerGetNotes() {
    return [...this.notes]; // cloning the array so that the main array is immutable.
  }
}
