import { Selector, State, Action, StateContext, Select } from '@ngxs/store';

import {
    SetMarkerRichiestaSelezionato,
    ClearMarkerRichiestaSelezionato,
    SetMarkerRichiestaHover,
    ClearMarkerRichiestaHover,
    SetMarkerMezzoSelezionato,
    ClearMarkerMezzoSelezionato,
    SetMarkerMezzoHover,
    ClearMarkerMezzoHover,
    SetMarkerSedeSelezionato,
    ClearMarkerSedeSelezionato,
    SetMarkerSedeHover,
    ClearMarkerSedeHover,
    ClearMarkerState,
    SetMarkerSCHover,
    ClearMarkerSCHover, ClearMarkerSCSelezionato, SetMarkerSCSelezionato
} from '../../actions/maps/marker.actions';
import { RichiestaMarker } from '../../../maps/maps-model/richiesta-marker.model';
import { Observable } from 'rxjs';
import { RichiesteMarkersState } from './richieste-markers.state';
import { SetCentroMappa } from '../../actions/maps/centro-mappa.actions';
import { CentroMappa } from '../../../maps/maps-model/centro-mappa.model';
import { GetMarkerDatiMeteo } from '../../actions/maps/marker-info-window.actions';
import { MezzoMarker } from '../../../maps/maps-model/mezzo-marker.model';
import { MezziMarkersState } from './mezzi-markers.state';
import { SedeMarker } from '../../../maps/maps-model/sede-marker.model';
import { SediMarkersState } from './sedi-markers.state';
import { SetSedeMarkerById } from '../../actions/maps/sedi-markers.actions';
import { SetMezzoMarkerById } from '../../actions/maps/mezzi-markers.actions';
import { SetRichiestaMarkerById } from '../../actions/maps/richieste-markers.actions';
import { MarkerOpachiState } from './marker-opachi.state';
import { MarkerInfoWindowState } from './marker-info-window.state';
import { MeteoMarkersState } from './meteo-markers.state';
import { ChiamateMarkersState } from './chiamate-markers.state';
import { MapsButtonsState } from './maps-buttons.state';
import { MAPSOPTIONS } from '../../../../../core/settings/maps-options';
import { SchedeContattoMarkersState } from './schede-contatto-markers.state';
import { Injectable } from '@angular/core';

export interface MarkerStateModel {
    markerRichiestaSelezionato: string;
    markerRichiestaHover: string;
    markerMezzoSelezionato: string;
    markerMezzoHover: string;
    markerSedeSelezionato: string;
    markerSedeHover: string;
    markerSCSelezionato: string;
    markerSCHover: string;
}

export const markerStateDefaults: MarkerStateModel = {
    markerRichiestaSelezionato: null,
    markerRichiestaHover: null,
    markerMezzoSelezionato: null,
    markerMezzoHover: null,
    markerSedeSelezionato: null,
    markerSedeHover: null,
    markerSCSelezionato: null,
    markerSCHover: null
};

@Injectable()
@State<MarkerStateModel>({
    name: 'marker',
    defaults: markerStateDefaults,
    children: [
        RichiesteMarkersState,
        MezziMarkersState,
        SediMarkersState,
        MarkerOpachiState,
        MarkerInfoWindowState,
        MeteoMarkersState,
        ChiamateMarkersState,
        MapsButtonsState,
        SchedeContattoMarkersState
    ]
})
export class MarkerState {

    @Select(SediMarkersState.getSedeById) sedeMarkerById$: Observable<SedeMarker>;
    @Select(MezziMarkersState.getMezzoById) mezzoMarkerById$: Observable<MezzoMarker>;
    @Select(RichiesteMarkersState.getRichiestaById) richiestaMarkerById$: Observable<RichiestaMarker>;

    @Selector()
    static markerRichiestaSelezionato(state: MarkerStateModel) {
        return state.markerRichiestaSelezionato;
    }

    @Selector()
    static markerRichiestaHover(state: MarkerStateModel) {
        return state.markerRichiestaHover;
    }

    @Selector()
    static markerMezzoSelezionato(state: MarkerStateModel) {
        return state.markerMezzoSelezionato;
    }

    @Selector()
    static markerMezzoHover(state: MarkerStateModel) {
        return state.markerMezzoHover;
    }

    @Selector()
    static markerSedeSelezionato(state: MarkerStateModel) {
        return state.markerSedeSelezionato;
    }

    @Selector()
    static markerSedeHover(state: MarkerStateModel) {
        return state.markerSedeHover;
    }

    @Selector()
    static markerSCSelezionato(state: MarkerStateModel) {
        return state.markerSCSelezionato;
    }

    @Selector()
    static markerSCHover(state: MarkerStateModel) {
        return state.markerSCHover;
    }

    @Selector()
    static markerStateNull(state: MarkerStateModel) {
        return (!state.markerRichiestaSelezionato && !state.markerMezzoSelezionato && !state.markerSedeSelezionato);
    }

    @Action(SetMarkerRichiestaSelezionato)
    setMarkerRichiestaSelezionato({ getState, patchState, dispatch }: StateContext<MarkerStateModel>, action: SetMarkerRichiestaSelezionato) {
        dispatch(new SetRichiestaMarkerById(action.markerRichiestaSelezionato));
        const state = getState();
        this.richiestaMarkerById$.subscribe(s => {
            if (s && s.id === action.markerRichiestaSelezionato) {
                const uniqueId = 'richiesta-' + action.markerRichiestaSelezionato;
                dispatch(new GetMarkerDatiMeteo(uniqueId, s.localita.coordinate));
                dispatch(new SetCentroMappa(new CentroMappa(s.localita.coordinate, MAPSOPTIONS.zoomSelezionato.richiesta)));
            }
        });
        patchState({
            ...state,
            markerRichiestaSelezionato: action.markerRichiestaSelezionato
        });
    }

    @Action(ClearMarkerRichiestaSelezionato)
    clearMarkerRichiestaSelezionato({ patchState }: StateContext<MarkerStateModel>) {
        patchState({
            markerRichiestaSelezionato: markerStateDefaults.markerRichiestaSelezionato
        });
    }

    @Action(SetMarkerRichiestaHover)
    setMarkerRichiestaHover({ patchState }: StateContext<MarkerStateModel>, action: SetMarkerRichiestaHover) {
        patchState({
            markerRichiestaHover: action.markerRichiestaHover
        });
    }

    @Action(ClearMarkerRichiestaHover)
    clearMarkerRichiestaHover({ patchState }: StateContext<MarkerStateModel>) {
        patchState({
            markerRichiestaHover: markerStateDefaults.markerRichiestaHover
        });
    }

    @Action(SetMarkerMezzoSelezionato)
    setMarkerMezzoSelezionato({ getState, patchState, dispatch }: StateContext<MarkerStateModel>, action: SetMarkerMezzoSelezionato) {
        dispatch(new SetMezzoMarkerById(action.markerMezzoSelezionato));
        const state = getState();
        this.mezzoMarkerById$.subscribe(s => {
            if (s && s.mezzo.codice === action.markerMezzoSelezionato) {
                const uniqueId = 'mezzo-' + action.markerMezzoSelezionato;
                dispatch(new GetMarkerDatiMeteo(uniqueId, s.mezzo.coordinate));
                if (!action.composizione) {
                    dispatch(new SetCentroMappa(new CentroMappa(s.mezzo.coordinate, MAPSOPTIONS.zoomSelezionato.mezzo)));
                }
            }
        });
        patchState({
            ...state,
            markerMezzoSelezionato: action.markerMezzoSelezionato
        });
    }

    @Action(ClearMarkerMezzoSelezionato)
    clearMarkerMezzoSelezionato({ patchState }: StateContext<MarkerStateModel>) {
        patchState({
            markerMezzoSelezionato: markerStateDefaults.markerMezzoSelezionato
        });
    }

    @Action(SetMarkerMezzoHover)
    setMarkerMezzoHover({ patchState }: StateContext<MarkerStateModel>, action: SetMarkerMezzoHover) {
        patchState({
            markerMezzoHover: action.markerMezzoHover
        });
    }

    @Action(ClearMarkerMezzoHover)
    clearMarkerMezzoHover({ patchState }: StateContext<MarkerStateModel>) {
        patchState({
            markerMezzoHover: markerStateDefaults.markerMezzoHover
        });
    }

    @Action(SetMarkerSedeSelezionato)
    setMarkerSedeSelezionato({ getState, patchState, dispatch }: StateContext<MarkerStateModel>, action: SetMarkerSedeSelezionato) {
        dispatch(new SetSedeMarkerById(action.markerSedeSelezionato));
        const state = getState();
        this.sedeMarkerById$.subscribe(s => {
            if (s && s.codice === action.markerSedeSelezionato) {
                const uniqueId = 'sede-' + action.markerSedeSelezionato;
                dispatch(new GetMarkerDatiMeteo(uniqueId, s.coordinate));
                dispatch(new SetCentroMappa(new CentroMappa(s.coordinate, MAPSOPTIONS.zoomSelezionato.sede)));
            }
        });
        patchState({
            ...state,
            markerSedeSelezionato: action.markerSedeSelezionato
        });
    }

    @Action(ClearMarkerSedeSelezionato)
    clearMarkerSedeSelezionato({ patchState, dispatch }: StateContext<MarkerStateModel>) {
        dispatch(new SetSedeMarkerById());
        patchState({
            markerSedeSelezionato: markerStateDefaults.markerSedeSelezionato
        });
    }

    @Action(SetMarkerSedeHover)
    setMarkerSedeHover({ patchState }: StateContext<MarkerStateModel>, action: SetMarkerSedeHover) {
        patchState({
            markerSedeHover: action.markerSedeHover
        });
    }

    @Action(ClearMarkerSedeHover)
    clearMarkerSedeHover({ patchState }: StateContext<MarkerStateModel>) {
        patchState({
            markerSedeHover: markerStateDefaults.markerSedeHover
        });
    }

    @Action(SetMarkerSCSelezionato)
    setMarkerSCSelezionato({ getState, patchState, dispatch }: StateContext<MarkerStateModel>, action: SetMarkerSCSelezionato) {
        // dispatch(new SetSCMarkerById(action.markerSCSelezionato));
        const state = getState();
        patchState({
            ...state,
            markerSCSelezionato: action.markerSCSelezionato
        });
    }

    @Action(ClearMarkerSCSelezionato)
    clearMarkerSCSelezionato({ patchState, dispatch }: StateContext<MarkerStateModel>) {
        // dispatch(new SetSCMarkerById());
        patchState({
            markerSCSelezionato: markerStateDefaults.markerSCSelezionato
        });
    }

    @Action(SetMarkerSCHover)
    setMarkerSCHover({ patchState }: StateContext<MarkerStateModel>, action: SetMarkerSCHover) {
        patchState({
            markerSCHover: action.markerSCHover
        });
    }

    @Action(ClearMarkerSCHover)
    clearMarkerSCHover({ patchState }: StateContext<MarkerStateModel>) {
        patchState({
            markerSCHover: markerStateDefaults.markerSCHover
        });
    }

    @Action(ClearMarkerState)
    clearMarkerState({ patchState }: StateContext<MarkerStateModel>) {
        patchState(markerStateDefaults);
    }

}
