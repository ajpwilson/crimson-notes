import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-forgottenpassword',
  templateUrl: 'forgottenpassword.html',
})
export class ForgottenpasswordPage implements OnInit {

  user: FormGroup;

  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthProvider,
    public alertCtrl: AlertController) {}

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', Validators.required]
    })
  }

  resetPassword({value, valid}: {value: FogPassUser, valid: boolean}): void {
    if (valid) {
      this.authService.resetPassword(value.email).then(
        async () => {
          const alert = await this.alertCtrl.create({
            message: 'Check your email for a password reset link',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.navCtrl.push(LoginPage);
                },
              },
            ],
          });
          await alert.present();
        },
        async error => {
          const errorAlert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{text: 'Ok', role: 'cancel'}],
          });
          await errorAlert.present();
        }
      );
    }
  }
}

interface FogPassUser {
  email: string
}
