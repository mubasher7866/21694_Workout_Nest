import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormManager } from 'src/app/services/forms/form-manager';
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  currentUser: any;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private formManager: FormManager,
    private loadingCtrl: LoadingController,
    private router: Router,
    private angularFirestore: AngularFirestore
  ) {}

  async ionViewDidEnter() {
    const id = await this.userService.token;
    const user = await this.angularFirestore
      .collection('users')
      .ref.doc(id)
      .get();
    this.currentUser = user.data();
    await this.initializeForm(this.currentUser);
  }

  public async initializeForm(currentUser: any) {
    this.form = this.fb.group({
      uid: [currentUser.uid, [Validators.required]],
      fname: [currentUser.fname, [Validators.required]],
      lname: [currentUser.lname, [Validators.required]],
      userType: [currentUser.userType, [Validators.required]],
      phone: [currentUser.phone, [Validators.required]],
      picture_thumbnail: [currentUser.picture_thumbnail],
      email: [currentUser.email, [Validators.required, Validators.email]],
    });
  }

  public async submit(): Promise<void> {
    let data: any = this.form.value;
    let submitFn = async () => {
      const id = await this.userService.token;
      const user = await this.angularFirestore
        .collection('users')
        .ref.doc(id)
        .update({
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          userType: data.userType,
          phone: data.phone,
        });
      this.router.navigateByUrl('/tabs/menu');
    };
    await this.formManager.submit(this.form, submitFn, 'Updated Successfully.');
  }

  async updateImage(base64: string) {
    let loadingView = await this.loadingCtrl.create();
    await loadingView.present();
    try {
      const user = await this.angularFirestore.collection('users');
      const id = await this.userService.token;
      await user.ref.doc(id).update({ picture_thumbnail: base64 });
      await this.ionViewDidEnter();
      await loadingView.dismiss();
    } catch (e) {
      await loadingView.dismiss();
      throw e;
    }
  }
}
