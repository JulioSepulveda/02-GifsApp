import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //Para obtener el valor de la caja de texto del html y poder interacturar con ella lo podemos realizar con @ViewChild 
  //(por ejemplo vaciarla una vez capturado el valor)
  //Entre <> podemos introducir el tipo que vamos a recibir para que no tenga un tipado genérico (ElementRef)
  @ViewChild( 'txtBuscar' ) txtBuscar!: ElementRef<HTMLInputElement>;

  //Instanciamos nuestro servicio
  constructor( private gifsService: GifsService ) {}

  buscar(valor: string ) {

    const valorCajaTexto = this.txtBuscar.nativeElement.value;

    this.gifsService.buscarGifs( valorCajaTexto );

    this.txtBuscar.nativeElement.value = "";
  }

}
