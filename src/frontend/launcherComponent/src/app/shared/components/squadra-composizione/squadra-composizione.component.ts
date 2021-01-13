import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SquadraComposizione } from '../../interface/squadra-composizione-interface';
import { SintesiRichiesta } from 'src/app/shared/model/sintesi-richiesta.model';
import { squadraComposizioneBusy } from '../../helper/composizione-functions';
import { Sede } from '../../model/sede.model';
import {ViewLayouts} from '../../interface/view.interface';
import {Observable, Subscription} from 'rxjs';
import {Select} from '@ngxs/store';
import {ViewComponentState} from '../../../features/home/store/states/view/view.state';

@Component({
    selector: 'app-squadra-composizione',
    templateUrl: './squadra-composizione.component.html',
    styleUrls: ['./squadra-composizione.component.css']
})
export class SquadraComposizioneComponent {
    @Input() squadraComp: SquadraComposizione;
    @Input() richiesta: SintesiRichiesta;
    @Input() itemSelezionato: boolean;
    @Input() itemHover: boolean;
    @Input() itemPrenotato: boolean;
    @Input() itemBloccato: boolean;

    @Output() selezionata = new EventEmitter<SquadraComposizione>();
    @Output() deselezionata = new EventEmitter<SquadraComposizione>();
    @Output() hoverIn = new EventEmitter<SquadraComposizione>();
    @Output() hoverOut = new EventEmitter<SquadraComposizione>();
    @Output() sbloccata = new EventEmitter<SquadraComposizione>();

    @Select(ViewComponentState.viewComponent) viewState$: Observable<ViewLayouts>;

    private subscription = new Subscription();
    viewState: ViewLayouts;


  constructor() {
      this.getViewState();
    }

    getViewState(): void {
      this.subscription.add(this.viewState$.subscribe(r => this.viewState = r));
    }

    onClick(): void {
        if (!this.itemSelezionato) {
            this.selezionata.emit(this.squadraComp);
        } else {
          this.deselezionata.emit(this.squadraComp);
        }
    }

    onHoverIn(): void {
        this.hoverIn.emit(this.squadraComp);
    }

    onHoverOut(): void {
        this.hoverOut.emit(this.squadraComp);
    }

    liClass(): string {
        let returnClass = '';

        const hover = this.itemHover ? 'hover-si' : 'hover-no';
        const selezionato = this.itemSelezionato ? 'selezionato-si' : 'selezionato-no';

        switch (hover + '|' + selezionato) {
            case 'hover-si|selezionato-no':
                returnClass += 'border-warning';
                break;
            case 'hover-no|selezionato-si':
                returnClass += 'border-danger diagonal-stripes bg-lightgrey';
                break;
            case 'hover-si|selezionato-si':
                returnClass += 'border-danger diagonal-stripes bg-lightgrey';
                break;
        }

        if (this.squadraComposizioneBusy()) {
            returnClass += ' diagonal-stripes bg-lightdanger';
        }
        return returnClass;
    }

    squadraComposizioneBusy(): boolean {
        if (this.squadraComp && this.squadraComp.squadra) {
            return squadraComposizioneBusy(this.squadraComp.squadra.stato);
        } else {
            return true;
        }
    }

    badgeDistaccamentoClass(): string {
        let result = 'badge-secondary';

        if (this.richiesta && this.squadraComp) {
            const distaccamentoSquadra = this.squadraComp.squadra.distaccamento.descrizione;

            if (this.richiesta.competenze && this.richiesta.competenze.length > 0) {
                this.richiesta.competenze.forEach((competenza: Sede, index: number) => {
                    if (competenza.descrizione === distaccamentoSquadra && index === 0) {
                        result = 'badge-primary';
                    }
                    if (competenza.descrizione === distaccamentoSquadra && index === 1) {
                        result = 'badge-info';
                    }
                });
            }
        }

        return result;
    }
}
