import { ShortNamePipeModule } from './../../pipes/short-name.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageUploaderComponent } from './image-uploader.component';

@NgModule({
  declarations: [ImageUploaderComponent],
  imports: [CommonModule, IonicModule, FormsModule, ShortNamePipeModule],
  exports: [ImageUploaderComponent],
})
export class ImageUploaderModule {}
