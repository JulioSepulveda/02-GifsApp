import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get historial() {
    return this.gifsService.historial;
  }

  constructor ( private gifsService: GifsService ) {}

  buscar ( elemento: string)  {

    //LLamada al método buscarGifs del servicio desde los elementos buscados del sidebar
    this.gifsService.buscarGifs( elemento );
  }
}
