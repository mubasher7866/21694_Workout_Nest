import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  currentUser: any;

  constructor(
    private loadingCtrl: LoadingController,
    private userService: UserService,
    private router: Router,
    public afStore: AngularFirestore,
    private alertCtrl: AlertController
  ) {}

  async ionViewDidEnter() {
    const id = await this.userService.token;
    const user = await this.afStore.collection('users').ref.doc(id).get();
    this.currentUser = user.data();
  }

  async logout() {
    let alertView = await this.alertCtrl.create({
      header: 'Log Out',
      message: 'Are you sure you want to log out?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Confirm', role: 'confirm' },
      ],
    });
    await alertView.present();
    let { role } = await alertView.onDidDismiss();
    if (role == 'confirm') {
      let loadingView = await this.loadingCtrl.create();
      await loadingView.present();
      this.userService.logout();
      setTimeout(async () => {
        this.router.navigateByUrl('/auth/login');
        await loadingView.dismiss();
      }, 1000);
    }
  }
}
