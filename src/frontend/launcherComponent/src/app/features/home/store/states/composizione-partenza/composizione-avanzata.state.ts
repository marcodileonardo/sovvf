import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { CompPartenzaService } from 'src/app/core/service/comp-partenza-service/comp-partenza.service';
import {
    ClearComposizioneAvanzata,
    FilterListeComposizioneAvanzata,
    GetListeComposizioneAvanzata,
    SetListeComposizioneAvanzata,
    UnselectMezziAndSquadreComposizioneAvanzata
} from '../../actions/composizione-partenza/composizione-avanzata.actions';
import { MezziComposizioneState } from '../../../../../shared/store/states/mezzi-composizione/mezzi-composizione.state';
import { SquadreComposizioneState } from '../../../../../shared/store/states/squadre-composizione/squadre-composizione.state';
import { ComposizionePartenzaState, ComposizionePartenzaStateModel } from './composizione-partenza.state';
import {
    ClearSelectedMezziComposizione,
    FilterListaMezziComposizione,
    SetListaMezziComposizione
} from '../../../../../shared/store/actions/mezzi-composizione/mezzi-composizione.actions';
import {
    ClearSelectedSquadreComposizione,
    FilterListaSquadreComposizione,
    SetListaSquadreComposizione
} from '../../../../../shared/store/actions/squadre-composizione/squadre-composizione.actions';
import { ListaComposizioneAvanzata } from '../../../../../shared/interface/lista-composizione-avanzata-interface';
import { BoxPartenzaState } from './box-partenza.state';
import { mezzoComposizioneBusy } from '../../../../../shared/helper/composizione-functions';
import { RemoveBoxPartenza } from '../../actions/composizione-partenza/box-partenza.actions';
import { ViewComponentState } from '../view/view.state';
import { Composizione } from '../../../../../shared/enum/composizione.enum';
import { GetPreAccoppiati } from '../../actions/composizione-partenza/composizione-veloce.actions';
import {
    StartListaComposizioneLoading,
    StopListaComposizioneLoading
} from '../../actions/composizione-partenza/composizione-partenza.actions';
import { FiltriComposizioneState } from '../../../../../shared/store/states/filtri-composizione/filtri-composizione.state';
import { PaginationComposizionePartenzaState } from 'src/app/shared/store/states/pagination-composizione-partenza/pagination-composizione-partenza.state';
import { FiltriComposizione } from '../../../composizione-partenza/interface/filtri/filtri-composizione-interface';
import { Injectable } from '@angular/core';
import { PatchPaginationMezziSquadre } from '../../../../../shared/store/actions/pagination-composizione-partenza/pagination-composizione-partenza.actions';
import { RicercaComposizioneState } from 'src/app/shared/store/states/ricerca-composizione/ricerca-composizione.state';

export interface ComposizioneAvanzataStateModel {
    listaMezziSquadre: ListaComposizioneAvanzata;
}

export const ComposizioneAvanzataStateDefaults: ComposizioneAvanzataStateModel = {
    listaMezziSquadre: null
};

@Injectable()
@State<ComposizioneAvanzataStateModel>({
    name: 'composizioneAvanzata',
    defaults: ComposizioneAvanzataStateDefaults
})
export class ComposizioneAvanzataState {

    @Selector()
    static listaMezziSquadre(state: ComposizioneAvanzataStateModel) {
        return state.listaMezziSquadre;
    }

    constructor(private squadreService: CompPartenzaService,
                private store: Store) {
    }

    @Action(GetListeComposizioneAvanzata)
    getListeComposizioneAvanzata({ dispatch }: StateContext<ComposizioneAvanzataStateModel>, action: GetListeComposizioneAvanzata) {
        dispatch(new StartListaComposizioneLoading());
        const obj = {} as FiltriComposizione;
        obj.idRichiesta = this.store.selectSnapshot(ComposizionePartenzaState.richiestaComposizione) ? this.store.selectSnapshot(ComposizionePartenzaState.richiestaComposizione).id : null;
        const paginationMezzi = this.store.selectSnapshot(PaginationComposizionePartenzaState.paginationMezzi);
        const paginationSquadre = this.store.selectSnapshot(PaginationComposizionePartenzaState.paginationSquadre);
        obj.mezziPagination = {
            page: action.options && action.options.page && action.options.page.pageMezzi ? action.options.page.pageMezzi : paginationMezzi.page,
            pageSize: paginationMezzi.pageSize
        };
        obj.squadrePagination = {
            page: action.options && action.options.page && action.options.page.pageSquadre ? action.options.page.pageSquadre : paginationSquadre.page,
            pageSize: paginationSquadre.pageSize
        };
        const mezzoComp = this.store.selectSnapshot(MezziComposizioneState.mezzoSelezionato);
        let codDistaccamentoMezzo = null;
        if(mezzoComp) {
            codDistaccamentoMezzo =  mezzoComp.mezzo.distaccamento.codice;
        }
        const squadreComp = this.store.selectSnapshot(SquadreComposizioneState.squadreSelezionate);
        let codDistaccamentoSquadre = null;
        if(squadreComp) {
            codDistaccamentoSquadre =  squadreComp.squadra.distaccamento.codice;
        }
        obj['codDistaccamentoMezzo'] = codDistaccamentoMezzo ? codDistaccamentoMezzo : null;
        obj['codDistaccamentoSquadre'] = codDistaccamentoSquadre && codDistaccamentoSquadre != [] ? codDistaccamentoSquadre : null;
        obj['CodiceDistaccamento'] = this.store.selectSnapshot(FiltriComposizioneState.filtriSelezionati).CodiceDistaccamento.length > 0 ? this.store.selectSnapshot(FiltriComposizioneState.filtriSelezionati).CodiceDistaccamento : null;
        obj['StatoMezzo'] = this.store.selectSnapshot(FiltriComposizioneState.filtriSelezionati).StatoMezzo.length> 0 ? this.store.selectSnapshot(FiltriComposizioneState.filtriSelezionati).StatoMezzo : null;
        obj['TipoMezzo'] = this.store.selectSnapshot(FiltriComposizioneState.filtriSelezionati).TipoMezzo.length > 0 ? this.store.selectSnapshot(FiltriComposizioneState.filtriSelezionati).TipoMezzo : null;
        obj['ricercaMezzi'] = this.store.selectSnapshot(RicercaComposizioneState.ricercaMezzi) ? this.store.selectSnapshot(RicercaComposizioneState.ricercaMezzi) : null;
        obj['ricercaSquadre'] = this.store.selectSnapshot(RicercaComposizioneState.ricercaSquadre) ? this.store.selectSnapshot(RicercaComposizioneState.ricercaSquadre) : null;
        console.log('*******OBJ CHE MANDIAMO ', obj);
        this.squadreService.getListeComposizioneAvanzata(obj).subscribe((listeCompAvanzata: ListaComposizioneAvanzata) => {
            console.log('*******LISTA MEZZI E SQUADRE ', listeCompAvanzata);
            if (listeCompAvanzata) {
                const listaBoxPartenza = this.store.selectSnapshot(BoxPartenzaState.boxPartenzaList);
                if (listeCompAvanzata.composizioneMezziDataArray) {
                    dispatch(new SetListaMezziComposizione(listeCompAvanzata.composizioneMezziDataArray));
                }
                if (listeCompAvanzata.composizioneSquadreDataArray) {
                    dispatch(new SetListaSquadreComposizione(listeCompAvanzata.composizioneSquadreDataArray));
                }
                dispatch(new SetListeComposizioneAvanzata(listeCompAvanzata));
                dispatch(new PatchPaginationMezziSquadre('mezzi', listeCompAvanzata.mezziPagination));
                dispatch(new PatchPaginationMezziSquadre('squadre', listeCompAvanzata.squadrePagination));

                if (listaBoxPartenza.length > 0) {
                    const listaBoxMezzi = listaBoxPartenza.filter(box => box.mezzoComposizione !== null);
                    if (listaBoxMezzi.length > 0) {
                        const mezziOccupati = [];
                        listeCompAvanzata.composizioneMezziDataArray.forEach(mezzo => {
                            if (mezzoComposizioneBusy(mezzo.mezzo.stato)) {
                                mezziOccupati.push(mezzo.id);
                            }
                        });
                        if (mezziOccupati.length > 0) {
                            listaBoxPartenza.forEach(box => {
                                if (box.mezzoComposizione && mezziOccupati.includes(box.mezzoComposizione.id)) {
                                    dispatch(new RemoveBoxPartenza(box));
                                }
                            });
                        }
                    }
                }
                dispatch(new StopListaComposizioneLoading());
            }
        }, () => {
            dispatch(new StopListaComposizioneLoading());
        });
    }

    @Action(SetListeComposizioneAvanzata)
    setListeComposizioneAvanzata({ patchState, dispatch }: StateContext<ComposizioneAvanzataStateModel>, action: SetListeComposizioneAvanzata) {
        patchState({
            listaMezziSquadre: action.listaMezziSquadre
        });
        const compMode = this.store.selectSnapshot(ViewComponentState.composizioneMode);
        if (compMode === Composizione.Veloce) {
            dispatch(new GetPreAccoppiati());
        }
        const filtriSelezionati = this.store.selectSnapshot(FiltriComposizioneState.filtriSelezionati);
        dispatch(new FilterListeComposizioneAvanzata(filtriSelezionati));
    }

    @Action(FilterListeComposizioneAvanzata) //********
    filterListeComposizioneAvanzata({ dispatch }: StateContext<ComposizionePartenzaStateModel>, action: FilterListeComposizioneAvanzata) {
        const squadreComposizione = this.store.selectSnapshot(SquadreComposizioneState.allSquadreComposione);
        const mezziComposizione = this.store.selectSnapshot(MezziComposizioneState.mezziComposizione);
        dispatch(new FilterListaMezziComposizione(null, action.filtri, squadreComposizione));
        dispatch(new FilterListaSquadreComposizione(null, action.filtri, mezziComposizione));
    }

    @Action(UnselectMezziAndSquadreComposizioneAvanzata)
    unselectMezziAndSquadreComposizioneAvanzata({ dispatch }: StateContext<ComposizioneAvanzataStateModel>) {
        dispatch(new ClearSelectedMezziComposizione());
        dispatch(new ClearSelectedSquadreComposizione());
    }

    @Action(ClearComposizioneAvanzata)
    clearComposizioneAvanzata({ patchState }: StateContext<ComposizioneAvanzataStateModel>) {
        patchState(ComposizioneAvanzataStateDefaults);
    }
}
