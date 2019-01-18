import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})

export class DateInputComponent implements OnInit {
  @Output() emitDate = new EventEmitter();
  @Output() emitRemoveDate = new EventEmitter();
  @Input() itemIndex;
  @Input() content;

  dateForm: FormGroup;
  inputSubmitted = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.dateForm = this.fb.group({
      date: ['', Validators.required]
    });
 }

  ngOnInit() {
    const inputSubmitted = window.sessionStorage.getItem('inputSubmitted' + this.itemIndex);
    if (inputSubmitted === '1') {
      this.inputSubmitted = true;
    }
    this.dateForm.controls['date'].setValue(this.content);
  }

  addDate(form) {
    const date = form.controls['date'].value;
    this.inputSubmitted = true;
    window.sessionStorage.setItem('inputSubmitted' + this.itemIndex, this.inputSubmitted ? '1': '0');
    this.emitDate.emit(date);
    form.markAsPristine();
  }

  removeDate(form) {
    this.emitRemoveDate.emit(this.inputSubmitted);
  }

  isTouchedInvalid(formName: string, controlName: string) {
    const controlTouched = this[formName].controls[controlName].touched;
    const controlValid = this[formName].controls[controlName].valid;
    return controlTouched && !controlValid;
  }
}

