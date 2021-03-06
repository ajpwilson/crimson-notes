import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Note } from "../../interfaces/interfaces";
import { EditModalPage } from "../edit-modal/edit-modal";

@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {

  note: object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modal: ModalController) {
      this.note = this.navParams.get('data')
  }

  openModal(note: Note) {
    const editNoteModal = this.modal.create(EditModalPage, {data: note});

    editNoteModal.present();

    editNoteModal.onDidDismiss(() => {
      this.navCtrl.popToRoot()
    })
  }
}
