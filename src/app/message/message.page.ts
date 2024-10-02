import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage  {

  constructor(private navCtrl: NavController) { }

  goBack() {
    this.navCtrl.back(); // This will navigate back to the previous page
  }
}
