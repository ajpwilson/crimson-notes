import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Note } from "../../interfaces/interfaces";
import { NotesProvider } from "../../providers/notes/notes";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-edit-modal',
  templateUrl: 'edit-modal.html',
})
export class EditModalPage {
  note: Note;
  @ViewChild('f') createForm: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private NotesProvider: NotesProvider) {
      this.note = this.navParams.get('data')
  }

  ionViewDidEnter() {
    // console.log('ViewDidEnter:', this.createForm);
    if (this.note) {
      this.createForm.controls.title.setValue(this.note.title)
      this.createForm.controls.tags.setValue(this.note.tags)
      this.createForm.controls.text.setValue(this.note.text)
    }
  }

  closeModal() {
    this.view.dismiss();
  }

  onSubmit(value: Note) {

    if (this.note) {
      const updatedNote = value;
      updatedNote.id = this.note.id;

      // ERROR TypeError: updatedNote.tags.split is not a function
      // This was happening when the note was being updated without updating the tags field.
      if(typeof updatedNote.tags === 'string') { // works with this line.
        let tags = (<string>updatedNote.tags).split(',');
        tags = tags.filter((tag: string) => {
          return tag.trim() != ''
        })
        updatedNote.tags = tags;
      }

      this.NotesProvider.updateNote(updatedNote);

    } else {

      const note = value;
      let date = new Date();
      note.id = date.getTime();

      let tags = (<string>note.tags).split(','); // type assertion
      tags = tags.filter((tag: string) => {
        return tag.trim();
      })
      note.tags = tags;

      this.NotesProvider.saveNote(note);
    }


    this.view.dismiss();
  }

}
