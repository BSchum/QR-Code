import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import QRCode from 'qrcode';


/*
  Generated class for the QrCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrCodeProvider {

  
  public generatedQrCode: string;
  constructor(public http: HttpClient) {
    this.generatedQrCode = "";
  }

  public Generate(code: string) {
    const self = this;
    QRCode.toDataURL(code, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generatedQrCode = url;
    });
  }
  
  public isGenerated(){
    return this.generatedQrCode !== "";
  }
}
