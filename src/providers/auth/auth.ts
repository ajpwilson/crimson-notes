import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthProvider {

  constructor(
    public http: HttpClient,
    public afAuth: AngularFireAuth) {}

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      // console.log('userCredentials', userCredentials)
      return firebase.firestore().collection("users").doc(userCredentials.user.uid)
        .set({
          email: userCredentials.user.email,
          id: userCredentials.user.uid
        })
    });
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
