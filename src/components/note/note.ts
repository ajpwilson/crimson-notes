import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from "../../interfaces/interfaces";

@Component({
  selector: 'note',
  templateUrl: 'note.html'
})
export class NoteComponent {

  @Input('note') note: Note; // ('propertyName') value;
  @Output() viewNote = new EventEmitter(); // Allows the code to generate the event that is being listened to.
  @Output() deleteNote = new EventEmitter(); // do these need to be typed?
  @Output() editNote = new EventEmitter();

  constructor() {}

  viewTheNote(note: Note) {
    this.viewNote.emit(note);
  }

  deleteTheNote(note: Note) {
    this.deleteNote.emit(note);
  }

  openTheModal(note: Note) {
    this.editNote.emit(note);
  }
}
