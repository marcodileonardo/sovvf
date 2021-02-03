import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DetttagliTipologieService } from '../../../../core/service/dettagli-tipologie/dettagli-tipologie.service';
import { TriageService } from '../../../../core/service/triage/triage.service';
import {
    GetDettagliTipologieByCodTipologia,
    ClearDettagliTipologie,
    SetDettaglioTipologiaTriageChiamata,
    SetTipologiaTriageChiamata,
    SetTriageChiamata
} from '../../actions/triage-modal/triage-modal.actions';
import { GetDettaglioTipologiaByCodTipologiaDto } from '../../../interface/dto/dettaglio-tipologia-dto.interface';
import { DettaglioTipologia } from '../../../interface/dettaglio-tipologia.interface';
import { TreeviewItem } from 'ngx-treeview';

export interface TriageChiamataModalStateModel {
    dettagliTipologia: DettaglioTipologia[];
    codTipologiaSelezionata: number;
    codDettagliTipologiaSelezionato: number;
    triage: TreeviewItem[];
}

export const TriageChiamataModalStateDefaults: TriageChiamataModalStateModel = {
    dettagliTipologia: null,
    codTipologiaSelezionata: undefined,
    codDettagliTipologiaSelezionato: undefined,
    triage: null
};

@Injectable()
@State<TriageChiamataModalStateModel>({
    name: 'triageChiamataModal',
    defaults: TriageChiamataModalStateDefaults
})

export class TriageChiamataModalState {

    constructor(private detttagliTipologieService: DetttagliTipologieService,
                private triageService: TriageService) {
    }

    @Selector()
    static dettagliTipologia(state: TriageChiamataModalStateModel): DettaglioTipologia[] {
        return state.dettagliTipologia;
    }

    @Selector()
    static triage(state: TriageChiamataModalStateModel): any {
        return state.triage;
    }

    @Action(GetDettagliTipologieByCodTipologia)
    getDettagliTipologieByCodTipologia({ patchState }: StateContext<TriageChiamataModalStateModel>, action: GetDettagliTipologieByCodTipologia): void {
        this.detttagliTipologieService.getDettaglioTipologiaByCodTipologia(action.codTipologia).subscribe((response: GetDettaglioTipologiaByCodTipologiaDto) => {
            patchState({
                dettagliTipologia: response.listaDettaglioTipologie
            });
        });
    }

    @Action(ClearDettagliTipologie)
    clearDettagliTipologie({ patchState }: StateContext<TriageChiamataModalStateModel>): void {
        patchState({
            dettagliTipologia: TriageChiamataModalStateDefaults.dettagliTipologia
        });
    }

    @Action(SetTipologiaTriageChiamata)
    setTipologiaTriageChiamata({ patchState }: StateContext<TriageChiamataModalStateModel>, action: SetTipologiaTriageChiamata): void {
        patchState({
            codTipologiaSelezionata: action.codTipologia
        });
    }

    @Action(SetDettaglioTipologiaTriageChiamata)
    setDettaglioTipologiaTriageChiamata({ patchState, dispatch }: StateContext<TriageChiamataModalStateModel>, action: SetDettaglioTipologiaTriageChiamata): void {
        patchState({
            codDettagliTipologiaSelezionato: action.codDettaglioTipologia
        });
        dispatch(new SetTriageChiamata());
    }

    @Action(SetTriageChiamata)
    setTriageChiamata({ getState, patchState }: StateContext<TriageChiamataModalStateModel>): void {
        const state = getState();
        const codTipologiaSelezionata = state.codTipologiaSelezionata;
        const codDettaglioTipologiaSelezionata = state.codDettagliTipologiaSelezionato;
        this.triageService.get(codTipologiaSelezionata, codDettaglioTipologiaSelezionata).subscribe((triage: TreeviewItem[]) => {
            patchState({
                triage
            });
        });
    }
}
