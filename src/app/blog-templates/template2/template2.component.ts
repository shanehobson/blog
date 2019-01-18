import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  styleUrls: ['./template2.component.scss']
})
export class Template2Component implements OnInit {

  @Input() blog;
  @Input() index;
  @Input() editPostMode;
  @Output() emitEditItem = new EventEmitter();
  @Output() emitRemoveItem = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onEditButtonClicked(i) {
    this.emitEditItem.emit(i);
  }

  onRemoveButtonClicked(i) {
    this.emitRemoveItem.emit(i);
  }
}
