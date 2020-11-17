import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import { VoceFiltro } from '../filtri-richieste/voce-filtro.model';
import { CategoriaFiltriSchedeContatto as Categoria } from 'src/app/shared/enum/categoria-filtri-schede-contatto';

@Component({
    selector: 'app-filtri-schede-contatto',
    templateUrl: './filtri-schede-contatto.component.html',
    styleUrls: ['./filtri-schede-contatto.component.css']
})
export class FiltriSchedeContattoComponent {

    @HostBinding('class') classes = 'input-group-append';

    @Input() filtri: VoceFiltro[];
    @Input() filtriSelezionati: VoceFiltro[];

    @Output() filtroSelezionato: EventEmitter<VoceFiltro> = new EventEmitter();
    @Output() filtriReset: EventEmitter<any> = new EventEmitter();

    Categoria = Categoria;

    constructor() {
    }

    onSelezioneFiltro(filtro: VoceFiltro): void {
      if (filtro) {
        this.filtriSelezionati.forEach((f: VoceFiltro) => {
          if (f !== filtro && f.categoria === filtro.categoria) {
            this.filtroSelezionato.emit(f);
          }
        });
        this.filtroSelezionato.emit(filtro);
      } else {
        const filtroDefault = {
          categoria: 'Gestione',
          codice: '6',
          descrizione: 'Da Sempre',
          name: undefined,
          selezionato: false,
          star: false,
          statico: undefined,
        };
        this.filtroSelezionato.emit(filtroDefault);
      }
    }

    eliminaFiltriAttivi(): void {
        this.filtriReset.emit();
    }


    _isSelezionato(filtro: VoceFiltro): boolean {
        return this.filtriSelezionati.filter((f: VoceFiltro) => f.codice === filtro.codice).length > 0;
    }
}
