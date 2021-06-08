import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interace';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'tgjvs2WD8LVm2Ri1KJkPYvB9VC7mBIGd';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  //Resultados lo ponemos del tipo Gif, el cual está definido en la interfaz que hemos creado de los datos que recibimos de la URL
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  //Para poder utilizar el servicio http tenemos que importarlo en el module (en este caso en el app.module.ts)
  constructor( private http: HttpClient ) {
    //Como puede devolver nulo si no existe historial puedo realizarlo de dos formas
    /* if ( localStorage.getItem( 'historial' ) ) {
      this._historial = JSON.parse( localStorage.getItem( 'historial' )! );
    } */

    //En esta segunda manera hacemos lo mismo pero en una sola línea
    this._historial = JSON.parse( localStorage.getItem( 'historial' )! ) || [];

    //Cargar la ultima busqueda al abrir la página
    this.resultados = JSON.parse( localStorage.getItem( 'resultados' )! ) || [];

    localStorage.getItem( 'historial' );
  }

  buscarGifs ( query: string ) {
    //Unshift almacena lo ultimo al principio del array

    if ( query.length == 0 )
    {
      return;
    }

    //Pasamos a minúsculas el texto
    query = query.trim().toLowerCase();

    if ( !this._historial.includes( query ) ) {

      this._historial.unshift( query );
      //Corta los 10 primeros registros para mantener en el historial solo 10
      this._historial = this._historial.splice(0,9);

      //Para almacenar la información del historial y poder acceder a ella cuando se recargue el navegador tenemos dos formas de hacerlo
      //1 - Session Storage -> se mantiene hasta que se cierra el navegador
      //2 - Local Storage -> se mantiene hasta que se limpie la cache o se vacíe el disco duro (no es para información sensible).
      //Esto lo podemos ver en la ventana de inspección del navegador - Application
      //Stringify convierte cualquier cosa recibida en una string. Monta un array con todo lo recibido. Su opuesto es un parse
      localStorage.setItem( 'historial', JSON.stringify( this._historial ) )
    }

    //Mejor forma de realizar una llamada a un API ya que con el servicio HTTP tenemos muchos más métodos
    //el resp le indicamos que es de tipo any ya que typeScript no es capaz de saber que tipo tiene antes de recibir los datos
    //Para no tener que dejar el tipo como any tenemos que crearnos una interface con la estructura que recibimos de la llamada.
    //para ello nos vamos a postman cogemos el código de respuesta y lo pegamos en la página https://app.quicktype.io/. Esta página nos crea el código
    //de nuestra interfaz. Después solamente tenemos que crear el archivo (gifs.interface.ts) y pegar el código. El tipo lo ponemos en el get

    const params = new HttpParams()
        .set( 'api_key', this.apiKey )
        .set( 'limit', '10' )
        .set( 'q', query );


    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params } )
    . subscribe ( (resp ) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify( this.resultados ));
    })

 /*    //LLamada a nuestro API para recuperar los datos de la busqueda (es mejor hacerlo con el servicio HTTP)
       //Hay que utlizar el htpps://
    fetch( 'https://api.giphy.com/v1/gifs/search?api_key=tgjvs2WD8LVm2Ri1KJkPYvB9VC7mBIGd&q=dragon ball z&limit=10' ).then ( resp => {
      resp.json().then(data => {
        console.log( data );
      })
    }) */
  }
}
