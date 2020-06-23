import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'note-filter',
  templateUrl: 'note-filter.html'
})
export class NoteFilterComponent {

  @Input('filteredTags') tag: string; // ('propertyName') value;
  @Output() filterTag: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  filterTags(tag: string) {
    this.filterTag.emit(tag);
  }

}
