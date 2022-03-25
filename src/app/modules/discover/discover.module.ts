import { ModalComponentModule } from './../../shared/modal-component/modal-component.module';
import { FormFieldsModule } from 'src/app/shared/form-fields/form-fields.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShortNamePipeModule } from 'src/app/pipes/short-name.pipe';
import { DiscoverPage } from './discover.page';
import { AgmCoreModule } from '@agm/core';
const routes: Routes = [
  {
    path: '',
    component: DiscoverPage,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBDbgbLqYQyTxyV9rwaD_f2qkSUEn5MgLU',
    }),
  ],
  declarations: [DiscoverPage],
})
export class DiscoverPageModule {}
