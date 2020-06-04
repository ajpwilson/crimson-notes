import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Note} from "../../interfaces/interfaces";
import {NotesProvider} from "../../providers/notes/notes";

/**
 * Generated class for the EditModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-modal',
  templateUrl: 'edit-modal.html',
})
export class EditModalPage {

  public note: object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private NotesProvider: NotesProvider) {
      this.note = this.navParams.data; // tried with get(), got data but couldn't access id.
  }

  closeModal() {
    this.view.dismiss();
  }

  onSubmit(value: Note) {
    const updatedNote = value;

    updatedNote.id = this.navParams.data.id;

    let tags = (<string>updatedNote.tags).split(','); // type assertion
    tags = tags.filter((tag: string) => { return tag.trim() != ''})
    updatedNote.tags = tags;

    this.NotesProvider.updateNote(updatedNote);
    this.view.dismiss();
  }

}
