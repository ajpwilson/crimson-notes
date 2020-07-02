import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { User } from "../../interfaces/interfaces";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  user: FormGroup;

  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    private authService: AuthProvider,
    private alertCtrl: AlertController) {}

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async registerUser({value, valid}: {value: User, valid: boolean}): Promise<void> {
    if(valid) {
      this.authService.registerUser(value.email, value.password).then(() => {
          this.navCtrl.push(LoginPage);
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
