import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Select, Store} from '@ngxs/store';
import {ViewportState} from '../../../../../shared/store/states/viewport/viewport.state';
import {Observable, Subscription} from 'rxjs';
import {SoccorsoAereoModalComponent} from '../../../../../shared/modal/soccorso-aereo-modal/soccorso-aereo-modal.component';
import {
  AddSoccorsoAereo,
  GetAzioniRichiesta
} from '../../../store/actions/composizione-partenza/composizione-soccorso-aereo.actions';
import {SintesiRichiesta} from '../../../../../shared/model/sintesi-richiesta.model';

@Component({
  selector: 'app-composizione-confirm-button',
  templateUrl: './composizione-confirm-button.component.html',
  styleUrls: ['./composizione-confirm-button.component.css']
})
export class ComposizioneConfirmButtonComponent {

  @Select(ViewportState.doubleMonitor) doubleMonitor$: Observable<boolean>;
  doubleMonitor: boolean;

  @Input() boxPartenzaLenght: number;
  @Input() disableConfirmPartenza = true;
  @Input() richiesta: SintesiRichiesta;

  @Output() confirmPartenzaInViaggio = new EventEmitter();
  @Output() confirmPartenzaInUscita = new EventEmitter();

  subscription = new Subscription();

  constructor(private store: Store,
              private modalService: NgbModal) {
    this.subscription.add(this.doubleMonitor$.subscribe(r => this.doubleMonitor = r));
    this.store.dispatch(new GetAzioniRichiesta());
  }

  _confirmPartenzaInViaggio(): void {
    this.confirmPartenzaInViaggio.emit();
  }

  _confirmPartenzaInUscita(): void {
    this.confirmPartenzaInUscita.emit();
  }

  openSoccorsoAereoModal(open: any): void {
    let modalOptions;
    if (open) {
      if (this.doubleMonitor) {
        modalOptions = {
          windowClass: 'modal-left',
          backdrop: 'static',
          backdropClass: 'light-blue-backdrop',
          centered: true,
          keyboard: false,
          size: 'lg',
        } as NgbModalOptions;
      } else {
        modalOptions = {
          windowClass: '',
          backdrop: 'static',
          backdropClass: 'light-blue-backdrop',
          centered: true,
          keyboard: false,
          size: 'lg',
        } as NgbModalOptions;
      }
    }
    const modal = this.modalService.open(SoccorsoAereoModalComponent, modalOptions);
    modal.componentInstance.richiesta = this.richiesta;
    modal.result.then((res: any) => {
      switch (res.status) {
        case 'ok':
          // console.log('Richiesta Soccorso AFM inserita con successo');
          break;
        case 'ko':
          break;
      }
    });
  }

}
