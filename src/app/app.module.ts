import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewNotePage } from '../pages/view-note/view-note';
import { NotesProvider } from '../providers/notes/notes';
import { EditModalPage } from "../pages/edit-modal/edit-modal";
import { ComponentsModule } from "../components/components.module";
import { RegisterPageModule } from "../pages/register/register.module";
import { LoginPageModule } from "../pages/login/login.module";
import {ForgottenpasswordPageModule} from "../pages/forgottenpassword/forgottenpassword.module";
import { firebaseConfig } from '../credentials';
import { AuthProvider } from "../providers/auth/auth";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewNotePage,
    EditModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    RegisterPageModule,
    LoginPageModule,
    ReactiveFormsModule,
    HttpClientModule,
    ForgottenpasswordPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewNotePage,
    EditModalPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotesProvider,
    AuthProvider,
    AngularFirestore
  ]
})
export class AppModule {}
