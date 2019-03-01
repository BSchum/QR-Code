import { Storage } from '@ionic/storage';
import { QrCodeProvider } from './../../providers/qr-code/qr-code';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  string: string;
  qrCodeUrl :string;
  constructor(public navCtrl: NavController, private QrCode:QrCodeProvider, private socialSharing: SocialSharing, private storage: Storage) {
    
  }

  public Generate(){
    this.QrCode.Generate(this.string);
    this.qrCodeUrl = this.QrCode.generatedQrCode;
    this.storage.length().then(index => {
      var date = new Date();
      var dateString = date.getDay() +"/"+date.getMonth()+"/"+date.getFullYear();
      this.storage.set(index.toString(), { name: this.string ,url: this.qrCodeUrl, date: dateString});
    });    
  }s

  isGenerated(){
    return this.qrCodeUrl !== "";
  }

  Share(){
    var options = {
      message: 'Mon magnifique QR Code!',
      subject: 'Qr Code!',
      files: [this.qrCodeUrl],
      image: this.qrCodeUrl
    };
    this.socialSharing.shareWithOptions(options);
  }
}
