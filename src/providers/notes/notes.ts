import { Injectable } from '@angular/core';
import { Note } from '../../interfaces/interfaces';

@Injectable()
export class NotesProvider {

  private notes: Note[] = [];

  constructor() {}

  saveNote(note: Note) {
    let date = new Date();
    note.id = date.getTime(); // not the best solution

    let tags = (<string>note.tags).split(','); // type assertion
    tags = tags.filter((tag: string) => { return tag.trim() != ''})
    note.tags = tags;

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
