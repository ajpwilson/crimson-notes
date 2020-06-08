import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CreateNotePage } from '../create-note/create-note';
import { NotesProvider } from "../../providers/notes/notes";
import { Note } from "../../interfaces/interfaces";
import { ViewNotePage } from "../view-note/view-note";
import { EditModalPage } from "../edit-modal/edit-modal";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: Note[];

  constructor(
    public navCtrl: NavController,
    private NotesProvider: NotesProvider,
    private modal: ModalController,
    public storage: Storage) {}

  ionViewWillEnter() {
    /* Remember providerGetNotes() is a promise, so depending on it's state .then is executed,
    which is executing an arrow function (anonymous function expression), which takes notes as a parameter.
    An arrow function retains the scope of the caller (class HomePage) inside the function, therefore .bind is not needed. */
    this.NotesProvider.providerGetNotes().then((notes: Note[]) => {
      this.notes = notes;
    });
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
  }

  deleteNote(note : Note) {
    this.NotesProvider.deleteNote(note);
  }
}

