import { Component, isDevMode, OnDestroy, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import {
    SetSchedaContattoTelefonata,
    SetSchedaContattoHover,
    ClearSchedaContattoHover
} from '../store/actions/schede-contatto/schede-contatto.actions';
import { SchedeContattoState } from '../store/states/schede-contatto/schede-contatto.state';
import { Observable, Subscription } from 'rxjs';
import { SchedaContatto } from 'src/app/shared/interface/scheda-contatto.interface';
import { ToggleSchedeContatto, ToggleChiamata } from '../store/actions/view/view.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DettaglioSchedaModalComponent } from './dettaglio-scheda-modal/dettaglio-scheda-modal.component';

@Component({
    selector: 'app-schede-contatto',
    templateUrl: './schede-contatto.component.html',
    styleUrls: ['./schede-contatto.component.css']
})
export class SchedeContattoComponent implements OnInit, OnDestroy {


    @Select(SchedeContattoState.schedeContattoCompetenza) schedeContattoCompetenza$: Observable<SchedaContatto[]>;
    schedeContattoCompetenza: SchedaContatto[];
    @Select(SchedeContattoState.schedeContattoConoscenza) schedeContattoConoscenza$: Observable<SchedaContatto[]>;
    schedeContattoConoscenza: SchedaContatto[];
    @Select(SchedeContattoState.idSchedaContattoHover) idSchedaContattoHover$: Observable<string>;
    idSchedaContattoHover: string;

    subscription: Subscription = new Subscription();

    constructor(private store: Store,
                private modal: NgbModal) {
        this.subscription.add(
            this.schedeContattoCompetenza$.subscribe((schedeContatto: SchedaContatto[]) => {
                this.schedeContattoCompetenza = schedeContatto;
            })
        );
        this.subscription.add(
            this.schedeContattoConoscenza$.subscribe((schedeContatto: SchedaContatto[]) => {
                this.schedeContattoConoscenza = schedeContatto;
            })
        );
        this.subscription.add(
            this.idSchedaContattoHover$.subscribe((idSchedaContatto: string) => {
                this.idSchedaContattoHover = idSchedaContatto;
            })
        );
    }

    ngOnInit(): void {
        isDevMode() && console.log('Componente Schede Contatto creato');
    }

    ngOnDestroy(): void {
        isDevMode() && console.log('Componente Schede Contatto distrutto');
    }

    setSchedaContattoTelefonata(schedaContatto: SchedaContatto) {
        this.store.dispatch(new SetSchedaContattoTelefonata(schedaContatto));
        this.store.dispatch(new ToggleChiamata());
    }

    dettaglioScheda(scheda: SchedaContatto) {
        const modal = this.modal.open(DettaglioSchedaModalComponent, { windowClass: 'xlModal', backdropClass: 'light-blue-backdrop', centered: true });
        modal.componentInstance.schedaContatto = scheda;
    }

    hoverIn(idSchedaContatto: string) {
        this.store.dispatch(new SetSchedaContattoHover(idSchedaContatto));
    }

    hoverOut() {
        this.store.dispatch(new ClearSchedaContattoHover());
    }

    tornaIndietro() {
        this.store.dispatch(new ToggleSchedeContatto());
    }


}