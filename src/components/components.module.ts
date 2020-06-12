import { NgModule } from '@angular/core';
import { NoteComponent } from './note-item/note-item';
import {IonicModule} from "ionic-angular";
import { FormComponent } from './form-component/form-component';
@NgModule({
	declarations: [
	  NoteComponent,
    FormComponent
  ],
	imports: [
	  IonicModule
  ],
	exports: [
	  NoteComponent,
    FormComponent
  ]
})
export class ComponentsModule {}
