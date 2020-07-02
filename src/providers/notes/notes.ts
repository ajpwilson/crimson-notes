import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../../interfaces/interfaces';
import { User } from "../../interfaces/interfaces";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class NotesProvider {

  notes: Note[] = [];

  constructor(
    public http: HttpClient,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth) {}

  saveNote(note: Note) {
    this.firestore.collection<User>("users").doc(firebase.auth().currentUser.uid).collection<Note>("notes").add(note);
  }

  updateNote(updatedNote: Note) {
    this.firestore.doc(`users/${firebase.auth().currentUser.uid}/notes/${updatedNote.id}`).update({
      title: updatedNote.title,
      text: updatedNote.text,
      tags: updatedNote.tags
    });
  }

  deleteNote(note: Note) {
    this.firestore.doc(`users/${firebase.auth().currentUser.uid}/notes/${note.id}`).delete();
  }

  providerGetNotes() {
    // RxJS -- .snapshotchanges() returns an Observable of data, It provides metadata (documentId) allowing CRUD operations, as the id can be used.
    return this.firestore.collection<User>("users").doc(firebase.auth().currentUser.uid).collection<Note>("notes").snapshotChanges();
  }
}
