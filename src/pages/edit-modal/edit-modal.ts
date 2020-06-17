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
    // console.log('ViewDidEnter:', this.createForm); // Kept for learning.
    if (this.note) {
      // Setting the form fields to the existing values of the note being edited.
      this.createForm.controls.title.setValue(this.note.title)
      this.createForm.controls.tags.setValue(this.note.tags.join(',')) // .join() is used to join the elements of the array into a string.
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
        /* .string() splits the string into an array of strings. .map() calls the provided callback function once for each
        element in the array, constructing a new array. So here each tag is being trimmed of whitespace and added to the new array.
        The .filter() calls the provided callback function, again once for each element in the array, and returns a value that equals true,
        in this case, if the tag is not an empty string, it returns true. */
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

// This interface is used for the form, because all the form inputs return strings.
interface FormNote {
  title: string
  id: number
  tags: string
  text: string
}
