import { ModalComponentModule } from './../../shared/modal-component/modal-component.module';
import { FormFieldsModule } from 'src/app/shared/form-fields/form-fields.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShortNamePipeModule } from 'src/app/pipes/short-name.pipe';
import { ProfilePage } from './profile.page';
import { ImageUploaderModule } from 'src/app/shared/image-uploader/image-uploader.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    FormFieldsModule,
    ShortNamePipeModule,
    ModalComponentModule,
    ImageUploaderModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
