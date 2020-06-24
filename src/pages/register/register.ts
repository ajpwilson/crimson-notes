import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../interfaces/interfaces";
import {ViewNotePage} from "../view-note/view-note";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  user: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.user = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    })
  }

  onSubmit({ value, valid }: {value: User, valid: boolean}) {
    console.log(value, valid)
    if (valid === true) {
      this.navCtrl.push(HomePage);
    }
  }

}
