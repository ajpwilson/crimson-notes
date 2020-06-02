import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CreateNotePage } from '../create-note/create-note';
import { NotesProvider } from "../../providers/notes/notes";
import {Note} from "../../interfaces/interfaces";
import {ViewNotePage} from "../view-note/view-note";
import {EditModalPage} from "../edit-modal/edit-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private notes: Note[] = [];

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
    const editNoteModal = this.modal.create(EditModalPage, note); // { data: note }

    editNoteModal.present();

    editNoteModal.onDidDismiss(() => {
      this.notes = this.NotesProvider.providerGetNotes();
    })
  }

  deleteNote(note : Note) {
    let i: number = this.notes.indexOf(note);
    this.notes.splice(i, 1);
  }
}

