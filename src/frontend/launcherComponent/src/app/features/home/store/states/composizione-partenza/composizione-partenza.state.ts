import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
    ClearPartenza,
    ConfirmPartenze,
    ReducerFilterListeComposizione,
    RichiestaComposizione,
    SetComposizioneMode,
    StartInvioPartenzaLoading,
    StartListaComposizioneLoading,
    StopInvioPartenzaLoading,
    StopListaComposizioneLoading,
    TerminaComposizione,
    ToggleComposizioneMode,
    UpdateListeComposizione,
    UpdateRichiestaComposizione
} from '../../actions/composizione-partenza/composizione-partenza.actions';
import { SintesiRichiesta } from '../../../../../shared/model/sintesi-richiesta.model';
import { ComposizioneMarker } from '../../../maps/maps-model/composizione-marker.model';
import {
    ClearComposizioneVeloce,
    ClearPreaccoppiati,
    ClearPreAccoppiatiSelezionatiComposizione, GetListaComposizioneVeloce
} from '../../actions/composizione-partenza/composizione-veloce.actions';
import { Composizione } from '../../../../../shared/enum/composizione.enum';
import {
    ClearComposizioneAvanzata,
    GetListeComposizioneAvanzata,
    UnselectMezziAndSquadreComposizioneAvanzata
} from '../../actions/composizione-partenza/composizione-avanzata.actions';
import {
    ClearListaMezziComposizione,
    ClearMezzoComposizione,
    ClearSelectedMezziComposizione
} from '../../../../../shared/store/actions/mezzi-composizione/mezzi-composizione.actions';
import {
    ClearListaSquadreComposizione,
    ClearSelectedSquadreComposizione,
    ClearSquadraComposizione
} from '../../../../../shared/store/actions/squadre-composizione/squadre-composizione.actions';
import { CompPartenzaService } from '../../../../../core/service/comp-partenza-service/comp-partenza.service';
import { AddInLavorazione, DeleteInLavorazione } from '../../actions/richieste/richiesta-attivita-utente.actions';
import { ClearDirection } from '../../actions/maps/maps-direction.actions';
import { GetInitCentroMappa } from '../../actions/maps/centro-mappa.actions';
import { ClearMarkerMezzoSelezionato, ClearMarkerState } from '../../actions/maps/marker.actions';
import { ClearBoxPartenze } from '../../actions/composizione-partenza/box-partenza.actions';
import { GetMarkersMappa, StartLoadingAreaMappa, StopLoadingAreaMappa } from '../../actions/maps/area-mappa.actions';
import { ShowToastr } from 'src/app/shared/store/actions/toastr/toastr.actions';
import { ToastrType } from 'src/app/shared/enum/toastr';
import { Injectable } from '@angular/core';
import { GetListaMezziSquadre } from '../../../../../shared/store/actions/sostituzione-partenza/sostituzione-partenza.actions';

export interface ComposizionePartenzaStateModel {
    richiesta: SintesiRichiesta;
    composizioneMode: Composizione;
    loadingListe: boolean;
    loadingInvioPartenza: boolean;
    loaded: boolean;
}

export const ComposizioneStateDefaults: ComposizionePartenzaStateModel = {
    richiesta: null,
    composizioneMode: Composizione.Avanzata,
    loadingListe: false,
    loadingInvioPartenza: false,
    loaded: null
};


@Injectable()
@State<ComposizionePartenzaStateModel>({
    name: 'composizionePartenza',
    defaults: ComposizioneStateDefaults
})

export class ComposizionePartenzaState {

    @Selector()
    static composizioneMode(state: ComposizionePartenzaStateModel): Composizione {
        return state.composizioneMode;
    }

    @Selector()
    static richiestaComposizione(state: ComposizionePartenzaStateModel): SintesiRichiesta {
        return state.richiesta;
    }

    @Selector()
    static richiestaComposizioneMarker(state: ComposizionePartenzaStateModel): ComposizioneMarker[] {
        let composizioneMarkers: ComposizioneMarker[] = [];
        if (state.richiesta !== ComposizioneStateDefaults.richiesta) {
            const composizioneMarker = new ComposizioneMarker(
                state.richiesta.id, state.richiesta.localita, state.richiesta.tipologie, null,
                state.richiesta.prioritaRichiesta, state.richiesta.stato, true, false);
            composizioneMarkers.push(composizioneMarker);
        } else {
            composizioneMarkers = [];
        }
        return composizioneMarkers;
    }

    @Selector()
    static loadingListe(state: ComposizionePartenzaStateModel): boolean {
        return state.loadingListe;
    }

    @Selector()
    static loadingInvioPartenza(state: ComposizionePartenzaStateModel): boolean {
        return state.loadingInvioPartenza;
    }

    @Selector()
    static loaded(state: ComposizionePartenzaStateModel): boolean {
        return state.loaded;
    }

    constructor(private store: Store,
                private compPartenzaService: CompPartenzaService) {
    }

    @Action(UpdateListeComposizione)
    updateListe({ dispatch }: StateContext<ComposizionePartenzaStateModel>, action: UpdateListeComposizione): void {
        console.warn('UpdateListeComposizione');
        dispatch(new GetListeComposizioneAvanzata());
    }

    @Action(ReducerFilterListeComposizione)
    reducerFilterListeComposizione({ getState, dispatch }: StateContext<ComposizionePartenzaStateModel>, action: ReducerFilterListeComposizione): void {
        const state = getState();
        const compMode = state.composizioneMode;
        if (compMode === Composizione.Avanzata) {
            dispatch(new GetListeComposizioneAvanzata());
        } else if (compMode === Composizione.Veloce) {
            dispatch(new GetListaComposizioneVeloce());
        }
    }

    @Action(RichiestaComposizione)
    richiestaComposizione({ patchState, dispatch }: StateContext<ComposizionePartenzaStateModel>, action: RichiestaComposizione): void {
        patchState({
            richiesta: action.richiesta
        });
        dispatch(new AddInLavorazione(action.richiesta));
    }

    @Action(ToggleComposizioneMode)
    toggleComposizioneMode({ getState, patchState, dispatch }: StateContext<ComposizionePartenzaStateModel>): void {
        const state = getState();
        if (state.composizioneMode === Composizione.Avanzata) {
            dispatch(new ClearListaMezziComposizione());
            dispatch(new ClearListaSquadreComposizione());
            dispatch(new UnselectMezziAndSquadreComposizioneAvanzata());
            patchState({
                composizioneMode: Composizione.Veloce
            });
        } else {
            dispatch(new ClearPreaccoppiati());
            patchState({
                composizioneMode: Composizione.Avanzata
            });
        }
    }

    @Action(SetComposizioneMode)
    setComposizioneMode({ patchState }: StateContext<ComposizionePartenzaStateModel>, action: SetComposizioneMode): void {
        patchState({
            composizioneMode: action.compMode
        });
    }

    @Action(UpdateRichiestaComposizione)
    updateRichiestaComposizione({ patchState }: StateContext<ComposizionePartenzaStateModel>, action: UpdateRichiestaComposizione): void {
        patchState({
            richiesta: action.richiesta
        });
    }

    @Action(ConfirmPartenze)
    confirmPartenze({ getState, patchState, dispatch }: StateContext<ComposizionePartenzaStateModel>, action: ConfirmPartenze): void {
        dispatch(new StartInvioPartenzaLoading());
        this.compPartenzaService.confermaPartenze(action.partenze).subscribe(() => {
            const state = getState();
            if (state.composizioneMode === Composizione.Avanzata) {
                dispatch([
                    new ClearBoxPartenze(),
                    new ClearSelectedMezziComposizione(),
                    new ClearSelectedSquadreComposizione(),
                    new UnselectMezziAndSquadreComposizioneAvanzata(),
                    new ClearListaMezziComposizione(),
                    new ClearListaSquadreComposizione()
                ]);
            } else if (state.composizioneMode === Composizione.Veloce) {
                dispatch([
                    new ClearPreAccoppiatiSelezionatiComposizione(),
                    new ClearPreaccoppiati()
                ]);
            }
            dispatch([
                new StopInvioPartenzaLoading(),
                new ClearMarkerMezzoSelezionato(),
                new ClearDirection()
            ]);
            const composizioneActive = !!(getState().richiesta);
            if (composizioneActive) {
                dispatch(new GetListeComposizioneAvanzata());
            } else {
                dispatch(new GetListaMezziSquadre());
            }
            dispatch(new ShowToastr(ToastrType.Success, 'Partenza inviata con successo'));
        }, () => {
            dispatch(new StopInvioPartenzaLoading());
        });
    }

    @Action(TerminaComposizione)
    terminaComposizione({ getState, dispatch }: StateContext<ComposizionePartenzaStateModel>): void {
        const state = getState();
        dispatch([
            new DeleteInLavorazione(state.richiesta),
            new ClearDirection(),
            new GetInitCentroMappa(),
            new ClearComposizioneVeloce(),
            new ClearComposizioneAvanzata(),
            new ClearMezzoComposizione(),
            new ClearSquadraComposizione(),
            new ClearPartenza(),
            new ClearMarkerState(),
        ]);
    }

    @Action(ClearPartenza)
    clearPartenza({ patchState }: StateContext<ComposizionePartenzaStateModel>): void {
        patchState(ComposizioneStateDefaults);
    }

    @Action(StartListaComposizioneLoading)
    startListaComposizioneLoading({ dispatch, patchState }: StateContext<ComposizionePartenzaStateModel>): void {
        patchState({
            loadingListe: true,
            loaded: false
        });
        dispatch(new StartLoadingAreaMappa());
    }

    @Action(StopListaComposizioneLoading)
    stopListaComposizioneLoading({ dispatch, patchState }: StateContext<ComposizionePartenzaStateModel>): void {
        patchState({
            loadingListe: false,
            loaded: true
        });
        dispatch([new StopLoadingAreaMappa(), new GetMarkersMappa()]);
    }

    @Action(StartInvioPartenzaLoading)
    startInvioPartenzaLoading({ patchState }: StateContext<ComposizionePartenzaStateModel>): void {
        patchState({
            loadingInvioPartenza: true
        });
    }

    @Action(StopInvioPartenzaLoading)
    stopInvioPartenzaLoading({ patchState }: StateContext<ComposizionePartenzaStateModel>): void {
        patchState({
            loadingInvioPartenza: false
        });
    }
}
