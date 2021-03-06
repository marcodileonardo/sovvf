import { Component } from '@angular/core';
import { Fonogramma } from '../../model/fonogramma.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getStatoFonogrammaStringByEnum } from '../../helper/function';

@Component({
    selector: 'app-dettaglio-fonogramma-modal',
    templateUrl: './dettaglio-fonogramma-modal.component.html',
    styleUrls: ['./dettaglio-fonogramma-modal.component.css']
})
export class DettaglioFonogrammaModalComponent {

    codiceRichiesta: string;
    fonogramma: Fonogramma;

    constructor(public modal: NgbActiveModal) {
    }

    getStatoFonogrammaStringByEnum(statoFonogramma): string {
        return getStatoFonogrammaStringByEnum(statoFonogramma);
    }

    onClose(): void {
        this.modal.dismiss('ko');
    }
}
