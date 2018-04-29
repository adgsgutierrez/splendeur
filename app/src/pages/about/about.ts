import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private servicios : Array<{id: number, nombre :string , value : boolean}> = [] ;
  private genero : string = 'f';

  constructor(public navCtrl: NavController , private constant : ConstantProvider ,private navParams: NavParams) {
    this.servicios = constant.getServicios().map((resp)=>{
      return {
        id : resp.id,
        nombre : resp.nombre,
        value : false
      };
    });
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
    this.turnoVeficar();
  }
}
