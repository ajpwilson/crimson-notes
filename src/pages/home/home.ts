import {Component, OnInit} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { NotesProvider } from "../../providers/notes/notes";
import { Note } from "../../interfaces/interfaces";
import { ViewNotePage } from "../view-note/view-note";
import { EditModalPage } from "../edit-modal/edit-modal";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  notes: Note[] = [];

  constructor(
    public navCtrl: NavController,
    private NotesProvider: NotesProvider,
    private modal: ModalController,
    private authService: AuthProvider) {}

  ngOnInit() {
    // RxJS -- .subscribe() is a method on the Observable. It allows you to listen for values that an Observable emits.
    this.NotesProvider.providerGetNotes().subscribe((notesData) => {
      this.notes = []; // synchronizing the notes array to match the collection within firebase.
      notesData.forEach(item => {
        let note: Note = item.payload.doc.data();
        note.id = item.payload.doc.id;
        this.notes.push(note); // make each object inside the array into a simple json object.
      })
    });
  }

  logoutUser() {
    this.authService.logoutUser();
    this.navCtrl.popToRoot();
  }

  createNote() {
    const editNoteModal = this.modal.create(EditModalPage);
    editNoteModal.present();
  }

  viewNote(note: Note) {
    this.navCtrl.push(ViewNotePage, {data: note});
  }

  openModal(note: Note) {
    const editNoteModal = this.modal.create(EditModalPage, {data: note});
    editNoteModal.present();
  }

  deleteNote(note : Note) {
    this.NotesProvider.deleteNote(note);
  }
}

