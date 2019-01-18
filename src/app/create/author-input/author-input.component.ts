import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-author-input',
  templateUrl: './author-input.component.html',
  styleUrls: ['./author-input.component.scss']
})

export class AuthorInputComponent implements OnInit {
  @Output() emitAuthor = new EventEmitter();
  @Output() emitRemoveAuthor = new EventEmitter();
  @Input() itemIndex;
  @Input() content;

  authorForm: FormGroup;
  inputSubmitted = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.authorForm = this.fb.group({
      author: ['', Validators.required]
    });
 }

  ngOnInit() {
    const inputSubmitted = window.sessionStorage.getItem('inputSubmitted' + this.itemIndex);
    if (inputSubmitted === '1') {
      this.inputSubmitted = true;
    }
    this.authorForm.controls['author'].setValue(this.content);
  }

  addAuthor(form) {
    const author = form.controls['author'].value;
    this.inputSubmitted = true;
    window.sessionStorage.setItem('inputSubmitted' + this.itemIndex, this.inputSubmitted ? '1': '0');
    this.emitAuthor.emit(author);
    form.markAsPristine();
  }

  removeAuthor(form) {
    this.emitRemoveAuthor.emit(this.inputSubmitted);
  }

  isTouchedInvalid(formName: string, controlName: string) {
    const controlTouched = this[formName].controls[controlName].touched;
    const controlValid = this[formName].controls[controlName].valid;
    return controlTouched && !controlValid;
  }
}

