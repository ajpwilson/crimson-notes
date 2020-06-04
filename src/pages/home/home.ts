import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CreateNotePage } from '../create-note/create-note';
import { NotesProvider } from "../../providers/notes/notes";
import { Note } from "../../interfaces/interfaces";
import { ViewNotePage } from "../view-note/view-note";
import { EditModalPage } from "../edit-modal/edit-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: Promise<Note[]>; // why does this need to be a promise?

  constructor(
    public navCtrl: NavController,
    private NotesProvider: NotesProvider,
    private modal: ModalController) {}

  ionViewWillEnter() {
    this.notes = this.NotesProvider.providerGetNotes();
  }

  createNote() {
    this.navCtrl.push(CreateNotePage);
  }

  viewNote(note: Note) {
    this.navCtrl.push(ViewNotePage, note);
  }

  openModal(note: Note) {
    const editNoteModal = this.modal.create(EditModalPage, note); // {data: note} -- reverted see edit-modal.ts

    editNoteModal.present();

    editNoteModal.onDidDismiss(() => {
      this.notes = this.NotesProvider.providerGetNotes();
    })
  }

  deleteNote(note : Note) {
    this.NotesProvider.deleteNote(note);
    this.notes = this.NotesProvider.providerGetNotes(); // having to click the button twice...
  }
}

