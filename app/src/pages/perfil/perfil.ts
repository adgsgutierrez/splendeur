import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  private usuario : any = {
    nombre : '',
    apellido : '',
    telefono : '',
    direccion : '',
    correo : '',
    sexo : ''
  }

  constructor(public navCtrl: NavController , private toastCtrl: ToastController) {
    this.usuario.nombre = "Alexandra";
    this.usuario.apellido = "Castillo";
    this.usuario.telefono = "3112456798";
    this.usuario.direccion = "Av 1 No 22 - 43";
    this.usuario.correo = "alexandra.castillo@gmail.com";
    this.usuario.sexo = "f";
  }

  public guardar(): void {
    let toast = this.toastCtrl.create({
      message: 'Tu información de perfil se ha actualizado',
      duration: 3000,
      position: 'bottom',
      showCloseButton : true,
      closeButtonText : 'Cerrar'
    });
    toast.present();
  }
}
