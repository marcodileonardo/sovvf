import { Action, Selector, State, StateContext } from '@ngxs/store';
import { RichiesteMarkerService } from '../../../../../core/service/maps-service';
import { RichiestaMarker } from '../../../maps/maps-model/richiesta-marker.model';
import {
    AddRichiesteMarkers,
    ClearRichiestaMarkerModifica,
    ClearRichiesteMarkers,
    GetRichiesteMarkers,
    InsertRichiestaMarker,
    OpacizzaRichiesteMarkers,
    PatchRichiesteMarkers,
    RemoveRichiestaMarker,
    SetRichiestaMarkerById,
    SetRichiesteMarkers,
    SetTipoOpacitaRichiesteMarkers,
    ToggleOpacitaRichiesteMarkers,
    UpdateRichiestaMarker,
    UpdateRichiestaMarkerModifica
} from '../../actions/maps/richieste-markers.actions';
import { wipeStatoRichiesta } from '../../../../../shared/helper/function';
import { ClearMarkerOpachiRichieste, SetMarkerOpachiRichieste } from '../../actions/maps/marker-opachi.actions';
import { append, insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { RichiesteMarkerAdapterService } from '../../../../../core/service/maps-service/richieste-marker/adapters/richieste-marker-adapter.service';
import { StartLoadingAreaMappa, StopLoadingAreaMappa } from '../../actions/maps/area-mappa.actions';
import { Injectable } from '@angular/core';

export interface RichiesteMarkersStateModel {
    richiesteMarkers: RichiestaMarker[];
    richiestaMarkerModifica: RichiestaMarker;
    richiesteMarkersId: string[];
    richiestaMarkerById: RichiestaMarker;
    statoOpacita: boolean;
    tipoOpacita: string[];
}

export const RichiesteMarkersStateDefaults: RichiesteMarkersStateModel = {
    richiesteMarkers: [],
    richiestaMarkerModifica: null,
    richiesteMarkersId: [],
    richiestaMarkerById: null,
    statoOpacita: false,
    tipoOpacita: null
};

@Injectable()
@State<RichiesteMarkersStateModel>({
    name: 'richiesteMarkers',
    defaults: RichiesteMarkersStateDefaults
})

export class RichiesteMarkersState {

    @Selector()
    static richiesteMarkers(state: RichiesteMarkersStateModel) {
        let markers = [];
        markers = state.richiesteMarkers;
        if (state.richiestaMarkerModifica) {
            markers = state.richiesteMarkers.filter((m: RichiestaMarker) => m.codice !== state.richiestaMarkerModifica.codice);
            markers.push(state.richiestaMarkerModifica);
        }
        return markers;
    }

    @Selector()
    static getRichiestaById(state: RichiesteMarkersStateModel) {
        return state.richiestaMarkerById;
    }

    constructor(private _richieste: RichiesteMarkerService) {
    }

    @Action(GetRichiesteMarkers)
    getRichiesteMarkers({ dispatch }: StateContext<RichiesteMarkersStateModel>, action: GetRichiesteMarkers) {
        dispatch([
            new StartLoadingAreaMappa()
        ]);
        // console.log('FiltroRichieste', action.filtri);
        this._richieste.getRichiesteMarkers(action.areaMappa, action.filtri).subscribe((data: RichiestaMarker[]) => {
                dispatch([
                    new SetRichiesteMarkers(data),
                    new StopLoadingAreaMappa()
                ]);
            }, () => dispatch([
                new StopLoadingAreaMappa()
            ])
        );
    }

    @Action(SetRichiesteMarkers)
    setRichiesteMarkers({ getState, dispatch }: StateContext<RichiesteMarkersStateModel>, action: SetRichiesteMarkers) {
        const state = getState();
        if (action.richiesteMarkers) {
            if (state.richiesteMarkers.length === 0) {
                dispatch(new PatchRichiesteMarkers(action.richiesteMarkers));
            } else {
                const actionRichiesteId: string[] = [];
                const richiesteMarkerRemoveId: string[] = [];
                const richiesteMarkerAdd: RichiestaMarker[] = [];
                /**
                 * marker da aggiungere
                 */
                action.richiesteMarkers.forEach(richiesta => {
                    actionRichiesteId.push(richiesta.id);
                    if (!state.richiesteMarkersId.includes(richiesta.id)) {
                        richiesteMarkerAdd.push(richiesta);
                    }
                });
                /**
                 * marker da rimuovere
                 */
                state.richiesteMarkers.forEach(richiesta => {
                    if (!actionRichiesteId.includes(richiesta.id)) {
                        richiesteMarkerRemoveId.push(richiesta.id);
                    }
                });
                /**
                 * tolgo i marker dallo stato
                 */
                if (richiesteMarkerRemoveId.length > 0) {
                    richiesteMarkerRemoveId.forEach(id => {
                        dispatch(new RemoveRichiestaMarker(id));
                    });
                }
                /**
                 * aggiungo i marker allo stato
                 */
                if (richiesteMarkerAdd.length > 0) {
                    dispatch(new AddRichiesteMarkers(richiesteMarkerAdd));
                }
            }
            // Todo logica ToggleAnimation da rivedere
            // this.mapIsLoaded$.subscribe(isLoaded => {
            //     if (isLoaded) {
            //         dispatch(new ToggleAnimation());
            //     }
            // });
            if (state.statoOpacita) {
                dispatch(new OpacizzaRichiesteMarkers());
            }
        }
    }

    @Action(PatchRichiesteMarkers)
    patchRichiesteMarkers({ patchState }: StateContext<RichiesteMarkersStateModel>, { payload }: PatchRichiesteMarkers) {
        patchState({
            richiesteMarkers: payload.map(item => RichiesteMarkerAdapterService.adapt(item)),
            richiesteMarkersId: payload.map(item => item.id)
        });
    }

    @Action(AddRichiesteMarkers)
    addRichiesteMarkers({ setState }: StateContext<RichiesteMarkersStateModel>, { payload }: AddRichiesteMarkers) {
        setState(
            patch({
                richiesteMarkers: append(payload.map(item => RichiesteMarkerAdapterService.adapt(item))),
                richiesteMarkersId: append(payload.map(item => item.id))
            })
        );
    }

    @Action(InsertRichiestaMarker)
    insertRichiestaMarker({ setState }: StateContext<RichiesteMarkersStateModel>, { payload, before }: InsertRichiestaMarker) {
        setState(
            patch({
                richiesteMarkers: insertItem(RichiesteMarkerAdapterService.adapt(payload), before),
                richiesteMarkersId: insertItem(payload.id, before)
            })
        );
    }

    @Action(UpdateRichiestaMarker)
    updateRichiestaMarker({ setState }: StateContext<RichiesteMarkersStateModel>, { payload }: UpdateRichiestaMarker) {
        setState(
            patch({
                richiesteMarkers: updateItem<RichiestaMarker>(richiesta => richiesta.id === payload.id, RichiesteMarkerAdapterService.adapt(payload))
            })
        );
    }

    @Action(RemoveRichiestaMarker)
    removeRichiestaMarker({ setState }: StateContext<RichiesteMarkersStateModel>, { payload }: RemoveRichiestaMarker) {
        setState(
            patch({
                richiesteMarkers: removeItem<RichiestaMarker>(richiesta => richiesta.id === payload),
                richiesteMarkersId: removeItem<string>(id => id === payload)
            })
        );
    }

    @Action(UpdateRichiestaMarkerModifica)
    updateRichiestaMarkerModifica({ patchState }: StateContext<RichiesteMarkersStateModel>, { payload }: UpdateRichiestaMarkerModifica) {
        patchState({
            richiestaMarkerModifica: payload
        });
    }

    @Action(ClearRichiestaMarkerModifica)
    clearRichiestaMarkerModifica({ patchState }: StateContext<RichiesteMarkersStateModel>) {
        patchState({
            richiestaMarkerModifica: null
        });
    }

    @Action(SetRichiestaMarkerById)
    setRichiestaMarkerById({ getState, patchState }: StateContext<RichiesteMarkersStateModel>, action: SetRichiestaMarkerById) {
        const state = getState();
        if (action.id) {
            patchState({
                richiestaMarkerById: state.richiesteMarkers.filter(richieste => richieste.id === action.id)[0]
            });
        } else {
            patchState({
                richiestaMarkerById: null
            });
        }
    }

    @Action(ToggleOpacitaRichiesteMarkers)
    toggleOpacitaRichiesteMarkers({ patchState, dispatch }: StateContext<RichiesteMarkersStateModel>, action: ToggleOpacitaRichiesteMarkers) {
        patchState({
            statoOpacita: action.toggle
        });
        if (!action.toggle) {
            patchState({
                tipoOpacita: RichiesteMarkersStateDefaults.tipoOpacita,
            });
            dispatch(new ClearMarkerOpachiRichieste());
        } else {
            dispatch(new SetTipoOpacitaRichiesteMarkers(action.stato));
        }
    }

    @Action(SetTipoOpacitaRichiesteMarkers)
    setTipoOpacitaRichiesteMarkers({ patchState, dispatch }: StateContext<RichiesteMarkersStateModel>, action: SetTipoOpacitaRichiesteMarkers) {
        patchState({
            tipoOpacita: action.stato
        });
        dispatch(new OpacizzaRichiesteMarkers());
    }

    @Action(OpacizzaRichiesteMarkers)
    opacizzaRichiesteMarkers({ getState, dispatch }: StateContext<RichiesteMarkersStateModel>) {
        const state = getState();
        if (state.statoOpacita && state.tipoOpacita) {
            if (state.richiesteMarkers) {
                dispatch(new SetMarkerOpachiRichieste(idRichiesteFiltrate(state.tipoOpacita, state.richiesteMarkers)));
            }
        }
    }

    @Action(ClearRichiesteMarkers)
    clearRichiesteMarkers({ patchState }: StateContext<RichiesteMarkersStateModel>) {
        patchState(RichiesteMarkersStateDefaults);
    }

}

export function idRichiesteFiltrate(stati: string[], richiesteMarkers: RichiestaMarker[]): string[] {
    const filteredId: string[] = [];
    richiesteMarkers.forEach(r => {
        stati.forEach(c => {
            if (wipeStatoRichiesta(r.stato).substring(0, 5).toLowerCase() === c.substring(0, 5).toLowerCase()) {
                filteredId.push(r.id);
            }
        });
    });
    return filteredId;
}
