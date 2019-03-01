import { Component, Testability } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import jsqrcode from 'jsqrcode';

/**
 * Generated class for the QrScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-qr-scan',
  templateUrl: 'qr-scan.html',
})
export class QrScanPage {
  scannedQrCode: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  public Scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedQrCode = barcodeData.text;
     }).catch(err => {
         console.log('Error', err);
     });
  }
  

  text: any;

  public ScanViaImage(event){
    const file = event.target.files[0];
    if(file != undefined){
      const reader = new FileReader();
      //On set la fonction du fileReader
      reader.onloadend = (evt) => {
        var target: any = evt.currentTarget;
        var image = new Image();

        //On set la callback de l'image pour avoir le resultat
        image.onload = () => {
          var QrDecoder = new jsqrcode();
          this.text = QrDecoder.decode(image);
          console.log(this.text);
        };
        //Va appeller image.onload
        image.src = target.result;
      }
      reader.readAsDataURL(file);
    }
  }
}
