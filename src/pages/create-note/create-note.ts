import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesProvider } from '../../providers/notes/notes';
import { Note } from '../../interfaces/interfaces';

@Component({
  selector: 'page-create-note',
  templateUrl: 'create-note.html',
})
export class CreateNotePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private NotesProvider: NotesProvider) {}

  onSubmit(value: Note) {
    const note = value;
    // this.NotesProvider.saveNote(note);
    this.navCtrl.popToRoot()
  }
}
