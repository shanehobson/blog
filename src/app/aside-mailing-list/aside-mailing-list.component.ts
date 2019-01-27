import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-aside-mailing-list',
  templateUrl: './aside-mailing-list.component.html',
  styleUrls: ['./aside-mailing-list.component.scss']
})
export class AsideMailingListComponent implements OnInit {

  mailingListForm: FormGroup;

  constructor( private fb: FormBuilder,) { 
    this.mailingListForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitMailingList(form) {
    const name = form.controls['name'].value;
    const email = form.controls['email'].value;
    console.log(name, email);
  }

}
