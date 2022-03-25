import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormManager } from './form-manager';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class RegisterForm {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formManager: FormManager,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  public async initializeForm() {
    this.form = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      userType: ['Learner', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public async submit(): Promise<void> {
    let data: any = this.form.value;
    let submitFn = async () => {
      const result =
        await this.angularFireAuth.auth.createUserWithEmailAndPassword(
          data.email,
          data.password
        );
      const user = await this.angularFirestore
        .collection('users')
        .doc(result.user.uid)
        .set({
          uid: result.user.uid,
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          password: data.password,
          emailVerified: result.user.emailVerified,
          userType: data.userType,
          phone: data.phone,
          lat: `53.${this.getRandom(15)}`,
          lng: `-6.${this.getRandom(16)}`
        });
    };
    await this.formManager.submit(
      this.form,
      submitFn,
      'Account Created Successfully.'
    );
  }

  getRandom(length) {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
  }
}
