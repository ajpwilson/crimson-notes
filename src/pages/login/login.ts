import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import {User} from "../../interfaces/interfaces";
import {RegisterPage} from "../register/register";
import {HomePage} from "../home/home";
import {ForgottenpasswordPage} from "../forgottenpassword/forgottenpassword";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  user: FormGroup;

  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    private authService: AuthProvider,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  forgottenPassword() {
    this.navCtrl.push(ForgottenpasswordPage);
  }

  async loginUser({value, valid}: {value: User, valid: boolean}): Promise<void> {
    if(valid) {
      this.authService.loginUser(value.email, value.password).then(
        () => {
          this.navCtrl.push(HomePage);
        },
        async error => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await alert.present();
        }
      )
    }
  }
}
