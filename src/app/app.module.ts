import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CreateNotePage } from "../pages/create-note/create-note";
import { ViewNotePage } from '../pages/view-note/view-note';
import { NotesProvider } from '../providers/notes/notes';
import { EditModalPage } from "../pages/edit-modal/edit-modal";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateNotePage,
    ViewNotePage,
    EditModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateNotePage,
    ViewNotePage,
    EditModalPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotesProvider
  ]
})
export class AppModule {}
