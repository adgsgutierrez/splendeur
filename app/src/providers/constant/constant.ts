/*
  Generated class for the ConstantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class ConstantProvider {

  private servicios = [{id : 1 , nombre : "Manicura"} ,
                        {id : 2 , nombre : "Pedicura"},
                        {id : 3 , nombre : "Corte Sencillo"},
                        {id : 4 , nombre : "Corte especial"},
                        {id : 5 , nombre : "Alisado"},
                        {id : 6 , nombre : "Risado"},
                        {id : 7 , nombre :  "Peinado"},
                        {id : 8 , nombre : "Depilación Cejas Cera"},
                        {id : 9 , nombre : "Depilación Nariz Cera"},
                        {id : 10 , nombre : "Depilación Piernas Cera"},
                        {id : 11 , nombre : "Depilación Axilas Cera"},
                        {id : 12 , nombre : "Depilación Bikini Cera"},
                        {id : 13 , nombre : "Depilación Completa Cera"}];

  public getServicios():any{
      return this.servicios;
  }
}
