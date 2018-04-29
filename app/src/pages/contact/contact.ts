import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';

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

  private distancia : number ;

  constructor(public navCtrl: NavController , private toastCtrl: ToastController) {
    this.distancia = parseInt(localStorage.getItem("mts") || '100') ;
  }

  public range():void{
    localStorage.setItem("mts", ""+this.distancia);
  }

  public guardar(): void {
    let toast = this.toastCtrl.create({
      message: 'Tu información de configuración se ha actualizado',
      duration: 3000,
      position: 'bottom',
      showCloseButton : true,
      closeButtonText : 'Cerrar'
    });
    toast.present();
  }
}
