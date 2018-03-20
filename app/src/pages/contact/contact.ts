import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  private configuracion: any = {
      sms : false,
      alarm : false,
      push:false,
      tiempo : 30,
      novedad : false,
      promocion : false
    };

  constructor(public navCtrl: NavController) {

  }

}
