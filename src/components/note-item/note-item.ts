import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from "../../interfaces/interfaces";

@Component({
  selector: 'note-item',
  templateUrl: 'note-item.html'
})
export class NoteComponent {

  @Input() note: Note; // ('propertyName') value;
  @Output() viewNote: EventEmitter<Note> = new EventEmitter<Note>(); // Allows the code to generate the event that is being listened to.
  @Output() deleteNote: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() editNote: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() {}

  viewNotes(note: Note) {
    this.viewNote.emit(note);
  }

  deleteNotes(note: Note) {
    this.deleteNote.emit(note);
  }

  openModals(note: Note) {
    this.editNote.emit(note);
  }
}
