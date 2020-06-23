import { NgModule } from '@angular/core';
import {IonicModule} from "ionic-angular";
import { NoteComponent } from './note-item/note-item';
import { NoteFilterComponent } from './note-filter/note-filter';
@NgModule({
	declarations: [
	  NoteComponent,
    NoteFilterComponent
  ],
	imports: [
	  IonicModule
  ],
	exports: [
	  NoteComponent,
    NoteFilterComponent
  ]
})
export class ComponentsModule {}
