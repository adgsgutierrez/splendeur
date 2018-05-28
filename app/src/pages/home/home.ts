import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController , Platform , AlertController , ToastController , ActionSheetController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  private mapOptions : any;
  private latitud : number = 4.6097100;
  private longitud : number = -74.0817500;
  private color : string = "#00796B";
  private turno : string = 'false';
  private width : number = 0;
  private height : number = 0;
  private load : boolean = false;
  private en_cola : boolean = false;
  private mensajes : string = "Estas en lista de espera...";
  private time : any;
  private listo_llego : boolean = false;
  private portrait : boolean = true;
  private subscription : any;
  private viewLateral : boolean = false;

  constructor(public navCtrl: NavController , private platform : Platform , private geolocation: Geolocation , private alertCtrl: AlertController , private toastCtrl: ToastController ,
    public actionSheetCtrl: ActionSheetController , private localNotifications: LocalNotifications , private screenOrientation: ScreenOrientation) {

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
           this.loadInfo();
         }else{
           this.viewLateral = false;
           this.portrait = false;
           this.loadInfo();
         }
           console.log("Orientation Changed" , this.screenOrientation.type);
       }
    );
    this.loadInfo();
  }

  private loadInfo(){
    if(!this.en_cola){
      this.turno =  localStorage.getItem('select') || 'false';
      console.log("Turno" , this.turno);
      if(this.turno != 'false'){
          this.load = true;
          setTimeout(()=>{
            this.load = false;
            this.geolocation.getCurrentPosition().then((resp) => {
              this.latitud = resp.coords.latitude;
              this.longitud = resp.coords.longitude;
              console.log("this.latitud", this.latitud);
              console.log("this.longitud", this.longitud);
              let latLng = new google.maps.LatLng(this.latitud, this.longitud);
              this.mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false,
                mapTypeControlOptions: {
                      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
                    }, // here´s the array of controls
                disableDefaultUI: true, // a way to quickly hide all controls
                mapTypeControl: true,
                scaleControl: true,
                zoomControl: false,
                zoomControlOptions: {
                  style: google.maps.ZoomControlStyle.LARGE
                }
              };
             this.loadMap();
            }).catch((error) => {
              console.log('Error getting location', error);
            });
          },3000);
      }
    }
  }

  private loadMap() {
    let radio = parseInt(localStorage.getItem("mts") || '100') ;
    if(this.portrait){
      this.width = this.platform.width();
      this.height = this.platform.height();
    }else{
      this.width = this.platform.width() - (this.platform.width() * 0.4);
      this.height = this.platform.height();
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

    this.adicionarMarcador(Math.floor((Math.random() * 6) + 1));

    var cityCircle = new google.maps.Circle({
      strokeColor: this.color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: this.color,
      fillOpacity: 0.25,
      map: this.map,
      center: new google.maps.LatLng(this.latitud, this.longitud),
      radius: radio
    });
    this.map.setTilt(75);
  }

  public adicionarMarcador(locales : number ){
    for(let i = 0 ; i < locales ; i++){
      let ltg = this.latitud ;
      let lnd = this.longitud;
      let aux = Math.floor((Math.random() * 1000) + 1);
      if(i%2 == 0){
        if(aux %2== 0){
            ltg = this.latitud + parseFloat('0.000'+parseInt(""+(aux*2+1)));
            lnd = this.longitud + parseFloat('0.000'+parseInt(""+(aux*2+1)));
        }else{
          ltg = this.latitud - parseFloat('0.000'+parseInt(""+(aux*2+1)));
          lnd = this.longitud + parseFloat('0.000'+parseInt(""+(aux*2+1)));
        }
      }else{
        if(aux %2== 0){
            ltg = this.latitud - parseFloat('0.00'+parseInt(""+(aux*2+1)));
            lnd = this.longitud - parseFloat('0.00'+parseInt(""+(aux*2+1)));
        }else{
          ltg = this.latitud + parseFloat('0.00'+parseInt(""+(aux*2+1)));
          lnd = this.longitud - parseFloat('0.00'+parseInt(""+(aux*2+1)));
        }
      }
      let image = 'assets/imgs/icon.png';
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: image,
        position: new google.maps.LatLng(ltg, lnd)
      });
    }

    let image = 'assets/imgs/profile.png';
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: image,
      position: new google.maps.LatLng(this.latitud, this.longitud)
    });

  }

  public informacion():void{
    let alert = this.alertCtrl.create({
    title: '<img src="assets/imgs/site.jpg"/>',
    message: '<b>Donde Martina</b><br>Cra 22 No 32 - 45<br><br>Estas a 3 turnos de ser atentida<br><br>¿Deseas tomar turno?',
    buttons: [
      {
        text: 'NO',
        role: 'cancel'
      },
      {
        text: 'SI',
        handler: () => {

          this.espera();
        }
      }
    ]
  });
  alert.present();
  }

  public espera():void{
    this.en_cola = true;
    let iteraciones = 1
    this.mensajes = "Estas en lista de espera...";
    this.time = setInterval(()=>{
      setTimeout(()=>{
        switch(iteraciones){
          case 1:
            this.mensajes = "Te avisaremos cuando Martina termine con este cliente.";
          break;
          case 2:
            this.mensajes = "Creo que este cliente es algo demorado, la próxima toca dejarlo calvo.";
          break;
          case 3:
            this.mensajes = "Enserio creo que Martina debe no consentir tanto a sus clientes, ellos suelen sentirse muy bien allí.";
          break;
          case 4:
            this.mensajes = "Los retoques son algo demorados, pero ya casí.";
          break;
          case 5:
            this.mensajes = "Estoy vibrandole a Martina, me impacienta hacerte esperar.";
          break;
          case 6:
            this.mensajes = "Listo ya casi, estamos listos.";
          break;
        }
        iteraciones = iteraciones +1;
      },5000);
      if(iteraciones == 6){
        clearInterval(this.time);
        this.lanzarNotificacion();
      }
    },6000);
  }

  public lanzarNotificacion():void{
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Listo martina esta esperandote',
      sound: 'file://assets/sound/alert.mp3',
      vibrate: true,
      led : 'blue',
      priority : 2,

    });
    this.listo_llego = true;

  }

  private llegar():void{
    this.en_cola = false;
    this.listo_llego = false;
  }

  public cancelar():void{
    let actionSheet = this.actionSheetCtrl.create({
      title: '¿Desea Cancelar el turno?',
      buttons: [
        {
          text: 'Si',
          role: 'yes',
          handler: () => {
            this.en_cola = false;
            clearInterval(this.time);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  private informacionV2():void{
    this.viewLateral = true;
  }

  ionViewWillLeave():void{
    this.subscription.unsubscribe();
  }
}
