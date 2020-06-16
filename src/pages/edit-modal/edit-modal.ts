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
      this.createForm.controls.tags.setValue(this.note.tags.join(','))
      this.createForm.controls.text.setValue(this.note.text)
    }
  }

  closeModal() {
    this.view.dismiss();
  }

  onSubmit(value: FormNote) {

    if (this.note) {

      const updatedNote: Note = {
        title: value.title,
        text: value.text,
        tags: (value.tags).split(',').map((tag: string) => { return tag.trim() })
          .filter((tag: string) => { return tag != ''}),
        id: this.note.id
      };

      this.NotesProvider.updateNote(updatedNote);

    } else {

      let date = new Date();

      const note: Note = {
        title: value.title,
        text: value.text,
        tags: (value.tags).split(',').map((tag: string) => { return tag.trim() })
          .filter((tag: string) => { return tag != ''}),
        id: date.getTime()
      };

      this.NotesProvider.saveNote(note);
    }

    this.view.dismiss();
  }

}

interface FormNote {
  title: string
  id: number
  tags: string
  text: string
}
