import { QrCode } from './../../model/QrCode';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<QrCode>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.selectedItem = navParams.get('item');

    this.items = [];
    this.storage.length().then(data => {
      for (let i = 0; i < data; i++) {
        this.storage.get(i.toString()).then(urls => {
          this.items.push(urls);
        });
      }
    });

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
