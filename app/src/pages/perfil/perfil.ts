import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  private portrait : boolean = true;
    private subscription : any;
  private usuario : any = {
    nombre : '',
    apellido : '',
    telefono : '',
    direccion : '',
    correo : '',
    sexo : '',
    photo :'assets/imgs/profile.jpg'
  }

  constructor(public navCtrl: NavController , private toastCtrl: ToastController , private camera: Camera , private screenOrientation: ScreenOrientation) {
    this.usuario.nombre = "Alexandra";
    this.usuario.apellido = "Castillo";
    this.usuario.telefono = "3112456798";
    this.usuario.direccion = "Av 1 No 22 - 43";
    this.usuario.correo = "alexandra.castillo@gmail.com";
    this.usuario.sexo = "f";
  }

  ionViewWillEnter() {
    // Watch the device compass heading change
    if(this.screenOrientation.type == 'portrait-primary'){
      this.portrait = true;
    }else{
      this.portrait = false;
    }
    this.subscription = this.screenOrientation.onChange().subscribe(
       () => {
         if(this.screenOrientation.type == 'portrait-primary'){
           this.portrait = true;
         }else{
           this.portrait = false;
         }
           console.log("Orientation Changed" , this.screenOrientation.type);
       }
    );
  }

  ionViewWillLeave():void{
    this.subscription.unsubscribe();
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

  public changeFoto():void{
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.usuario.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     let toast = this.toastCtrl.create({
       message: 'Se produjo un inconveniente con tu foto, intentalo nuevamente.',
       duration: 3000,
       position: 'bottom',
       showCloseButton : false,
       closeButtonText : 'Cerrar'
     });
     toast.present();
    });
  }
}
