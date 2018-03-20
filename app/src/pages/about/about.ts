import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private turno : boolean = false;
  private servicios : Array<{id: number, nombre :string}> = [] ;
  private genero : string = 'f';

  constructor(public navCtrl: NavController , private constant : ConstantProvider) {
    this.servicios = constant.getServicios().map((resp)=>{
      return {
        id : resp.id,
        nombre : resp.nombre,
        value : false
      };
    });
  }

}
