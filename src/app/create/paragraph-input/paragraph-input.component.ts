import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-paragraph-input',
  templateUrl: './paragraph-input.component.html',
  styleUrls: ['./paragraph-input.component.scss']
})

export class ParagraphInputComponent implements OnInit {
  @Output() emitParagraph = new EventEmitter();
  @Output() emitRemoveParagraph = new EventEmitter();
  @Input() itemIndex;
  @Input() content;

  paragraphForm: FormGroup;
  inputSubmitted = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.paragraphForm = this.fb.group({
      paragraph: ['', Validators.required]
    });
 }

  ngOnInit() {
    const inputSubmitted = window.sessionStorage.getItem('inputSubmitted' + this.itemIndex);
    if (inputSubmitted === '1') {
      this.inputSubmitted = true;
    }
    this.paragraphForm.controls['paragraph'].setValue(this.content);
  }

  addParagraph(form) {
    const paragraph = form.controls['paragraph'].value;
    this.inputSubmitted = true;
    window.sessionStorage.setItem('inputSubmitted' + this.itemIndex, this.inputSubmitted ? '1': '0');
    this.emitParagraph.emit(paragraph);
    form.markAsPristine();
  }

  removeParagraph(form) {
    this.emitRemoveParagraph.emit(this.inputSubmitted);
  }

  isTouchedInvalid(formName: string, controlName: string) {
    const controlTouched = this[formName].controls[controlName].touched;
    const controlValid = this[formName].controls[controlName].valid;
    return controlTouched && !controlValid;
  }
}
