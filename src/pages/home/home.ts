import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
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
  filterToggle: boolean = false;
  filteredTags: string[] = [];

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
      this.getFilterTags();
    })

  };

  openModal(note?: Note) {
    const editNoteModal = this.modal.create(EditModalPage, {data: note});

    editNoteModal.onDidDismiss(() => {
      this.getFilterTags();
    })
    editNoteModal.present();
  }

  viewNote(note: Note) {
    this.navCtrl.push(ViewNotePage, {data: note});
  }

  deleteNote(note : Note) {
    this.NotesProvider.deleteNote(note);
    this.getFilterTags();
  }

  getFilterTags() {
    /* Using .map() to iterate through each note and return each tags array. .map() calls the provided callback function once for each
    element in the array, constructing a new array. We are returning an array of nested arrays (one for each note). */
    const allTags: string[][] = this.notes.map((note: Note) => {
      return note.tags
    })

    /* .concat() is being used to concatenate (link together) all the arrays into a new empty array assigned to a variable (mergedTags).
    As we have a dynamic number of nested arrays within allTags, when passing arguments (allTags) to a function (.concat()), we can use the spread operator (...) to
    expand an iterable element. Rather than having to pass each argument individually, we can "spread" out each item (in the nested arrays within allTags) as its own argument.
    In this case, allTags is an array of nested arrays, where each element is iterated over, and expanded out into its own individual argument, which is then concatenated
    into one array. */
    const mergedTags: string[] = [].concat(...allTags);

    /* Once we have our concatenated array, we need to filter out any duplicates. We do this by combining .filter() with .indexOf(). .indexOf() is a method that returns
    the first index it finds of the provided element from the mergedTags array. The .filter() method creates a new array of elements that pass the conditional we provide.
    If the element returns true then it will be included in the array, otherwise it returns false and will not be in the filtered array. The conditional is if the element
    (or item) equals it's index then it is true, otherwise it is false. */
    const filteredTags = mergedTags.filter((item: string, index: number) => {
      return mergedTags.indexOf(item) === index;
    });

    this.filteredTags = filteredTags;
  }

  filterTag(tag: string) {
    /* Using .filter() again to return true if the element (note) in the array,
    has tags as a property, returning true if so and (&&) those tags include the search parameter,
    returning true if so. This is assigned to the current array (this.notes) so that it updates in the template. */
    this.notes = this.notes.filter((note: Note) => {
      return note.tags && note.tags.includes(tag)
    });
  }

  clearFilter() {
    this.NotesProvider.providerGetNotes().then((notes: Note[]) => {
      this.notes = notes;
    })
  }
}

