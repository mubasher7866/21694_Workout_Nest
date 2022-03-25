import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  @Input() placeholderText: string;
  @Input() placeholder: string;
  @Output() base64: EventEmitter<string | ArrayBuffer> = new EventEmitter<
    string | ArrayBuffer
  >();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async crop(event: any) {
    let file = (event.target as any).files[0];
    if (file) {
      let base64;
      base64 = await this.convertBase64(file);
      if (base64) {
        this.base64.emit(base64);
      }
    }
  }

  convertBase64(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
