import { NgModule } from '@angular/core';
import { NoteComponent } from './note-item/note-item';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [
	  NoteComponent
  ],
	imports: [
	  IonicModule
  ],
	exports: [
	  NoteComponent
  ]
})
export class ComponentsModule {}
