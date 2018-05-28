import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private servicios : Array<{id: number, nombre :string , value : boolean}> = [] ;
  private servicios1 : Array<{id: number, nombre :string , value : boolean}> = [] ;
  private genero : string = 'f';
  private portrait : boolean = true;
  private subscription : any;

  constructor(public navCtrl: NavController , private constant : ConstantProvider ,private navParams: NavParams , private screenOrientation: ScreenOrientation) {
    this.servicios = constant.getServicios().map((resp)=>{
      return {
        id : resp.id,
        nombre : resp.nombre,
        value : false
      };
    });
    this.servicios1 = constant.getServicios().map((resp)=>{
      return {
        id : resp.id,
        nombre : resp.nombre,
        value : false
      };
    });
  }

  ionViewDidEnter(){
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


  public turnoVeficar(){
    let exist : boolean = false;
    this.servicios.forEach((data)=>{
      //console.log("data",data);
       if(data.value){
        // console.log("Existe ", data);
         exist = true;
      }
    });

    if(exist){
      localStorage.setItem('select','true');
    }else{
      localStorage.setItem('select','false');
    }
  }

  ionViewWillLeave():void{
    this.subscription.unsubscribe();
    this.turnoVeficar();
  }
}
