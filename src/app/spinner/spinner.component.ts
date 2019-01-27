import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() color: String;

  constructor() { }

  ngOnInit() {
  }

  getColor() {
    if (this.color) {
      return this.color;
    } else {
      return 'default';
    }
  }

}
