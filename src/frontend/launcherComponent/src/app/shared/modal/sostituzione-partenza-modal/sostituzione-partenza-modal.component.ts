import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetListaMezziSquadre } from '../../store/actions/sostituzione-partenza/sostituzione-partenza.actions';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SostituzionePartenzaModalState } from '../../store/states/sostituzione-partenza-modal/sostituzione-partenza-modal.state';
import { MezziComposizioneState } from '../../store/states/mezzi-composizione/mezzi-composizione.state';
import { MezzoComposizione } from '../../interface/mezzo-composizione-interface';
import { SquadreComposizioneState } from '../../store/states/squadre-composizione/squadre-composizione.state';
import { SquadraComposizione } from '../../interface/squadra-composizione-interface';
import { makeCopy } from '../../helper/function';
import { StatoMezzo } from '../../enum/stato-mezzo.enum';
import {
    ClearListaMezziComposizione,
    HoverInMezzoComposizione,
    HoverOutMezzoComposizione,
    ReducerSelectMezzoComposizione,
    UnselectMezzoComposizione
} from '../../store/actions/mezzi-composizione/mezzi-composizione.actions';
import { ClearBoxPartenze } from '../../../features/home/store/actions/composizione-partenza/box-partenza.actions';
import { squadraComposizioneBusy } from '../../helper/composizione-functions';
import {
    ClearListaSquadreComposizione,
    HoverInSquadraComposizione,
    HoverOutSquadraComposizione,
    SelectSquadraComposizione,
    UnselectSquadraComposizione
} from '../../store/actions/squadre-composizione/squadre-composizione.actions';
import { UnselectMezziAndSquadreComposizioneAvanzata } from '../../../features/home/store/actions/composizione-partenza/composizione-avanzata.actions';
import { ClearFiltriAffini } from '../../store/actions/filtri-composizione/filtri-composizione.actions';
import { FiltriComposizioneState } from '../../store/states/filtri-composizione/filtri-composizione.state';
import { SetRicercaMezziComposizione, SetRicercaSquadreComposizione } from '../../store/actions/ricerca-composizione/ricerca-composizione.actions';
import { ComposizionePartenzaState } from '../../../features/home/store/states/composizione-partenza/composizione-partenza.state';
import { ListaSquadre } from '../../interface/lista-squadre';
import { VisualizzaListaSquadrePartenza } from '../../../features/home/store/actions/richieste/richieste.actions';
import { Partenza } from '../../model/partenza.model';
import { Mezzo } from '../../model/mezzo.model';
import { Squadra } from '../../model/squadra.model';

@Component({
    selector: 'app-sostituzione-partenza',
    templateUrl: './sostituzione-partenza-modal.component.html',
    styleUrls: ['./sostituzione-partenza-modal.component.css']
})
export class SostituzionePartenzaModalComponent implements OnInit, OnDestroy {

    @Select(SostituzionePartenzaModalState.formValid) formValid$: Observable<boolean>;
    formValid: boolean;

    // Mezzi Composizione
    @Select(MezziComposizioneState.mezziComposizione) mezziComposizione$: Observable<MezzoComposizione[]>;
    mezziComposizione: MezzoComposizione[];
    @Select(MezziComposizioneState.idMezzoComposizioneSelezionato) idMezzoSelezionato$: Observable<string>;
    idMezzoSelezionato: string;
    @Select(MezziComposizioneState.idMezziInPrenotazione) idMezziInPrenotazione$: Observable<string[]>;
    idMezziInPrenotazione: string[];
    @Select(MezziComposizioneState.idMezziPrenotati) idMezziPrenotati$: Observable<string[]>;
    idMezziPrenotati: string[];
    @Select(MezziComposizioneState.idMezziBloccati) idMezziBloccati$: Observable<string[]>;
    idMezziBloccati: string[];
    @Select(MezziComposizioneState.idMezzoHover) idMezzoHover$: Observable<string>;
    idMezzoHover: string;

    // Squadre Composizione
    @Select(SquadreComposizioneState.squadreComposizione) squadraComposizione$: Observable<SquadraComposizione[]>;
    squadreComposizione: SquadraComposizione[];
    @Select(SquadreComposizioneState.idSquadreSelezionate) idSquadreSelezionate$: Observable<string[]>;
    idSquadreSelezionate: Array<string>;
    @Select(SquadreComposizioneState.idSquadraHover) idSquadraHover$: Observable<string>;
    idSquadraHover: string;

    // Filtri
    @Select(FiltriComposizioneState.filtriAffini) filtriAffini$: Observable<any>;

    // Loading Liste Mezzi e Squadre
    @Select(ComposizionePartenzaState.loadingListe) loadingListe$: Observable<boolean>;
    loadingListe: boolean;

    idRichiesta: string;
    codRichiesta: string;
    partenza: Partenza;
    sostituzionePartenzaForm: FormGroup;
    submitted: boolean;

    statoMezzo = StatoMezzo;
    ricercaSquadre: string;
    ricercaMezzi: string;
    partenzaDaSostituire: boolean = true;
    partenzaSostitutiva: boolean = true;
    nuovoMezzo: Mezzo = {
        codice: '',
        descrizione: '',
        genere: '',
        stato: null,
        appartenenza: null,
        distaccamento: null,
        coordinate: null,
    };
    nuoveSquadre: Squadra[] = [];

    subscription: Subscription = new Subscription();

    constructor(private modal: NgbActiveModal,
                private fb: FormBuilder,
                private store: Store) {
        // Prendo i mezzi da visualizzare nella lista
        this.subscription.add(
            this.mezziComposizione$.subscribe((mezziComp: MezzoComposizione[]) => {
                this.mezziComposizione = mezziComp;
            })
        );
        // Prendo il mezzo selezionato
        this.subscription.add(
            this.idMezzoSelezionato$.subscribe((idMezzo: string) => {
                this.idMezzoSelezionato = idMezzo;
            })
        );
        // Prendo i mezzi in prenotazione
        this.subscription.add(
            this.idMezziInPrenotazione$.subscribe((idMezzi: string[]) => {
                this.idMezziInPrenotazione = idMezzi;
            })
        );
        // Prendo i mezzi prenotati
        this.subscription.add(
            this.idMezziPrenotati$.subscribe((idMezzi: string[]) => {
                this.idMezziPrenotati = idMezzi;
            })
        );
        // Prendo il mezzo hover
        this.subscription.add(
            this.idMezzoHover$.subscribe((idMezzo: string) => {
                this.idMezzoHover = idMezzo;
            })
        );
        // Prendo il mezzo bloccato
        this.subscription.add(
            this.idMezziBloccati$.subscribe((idMezzi: string[]) => {
                this.idMezziBloccati = idMezzi;
            })
        );
        // Prendo le squadre da visualizzare nella lista
        this.subscription.add(
            this.squadraComposizione$.subscribe((squadreComp: SquadraComposizione[]) => {
                this.squadreComposizione = makeCopy(squadreComp);
            })
        );
        // Prendo la squadra selezionata
        this.subscription.add(
            this.idSquadreSelezionate$.subscribe((idSquadre: string[]) => {
                this.idSquadreSelezionate = idSquadre;
            })
        );
        // Prendo la squadra hover
        this.subscription.add(
            this.idSquadraHover$.subscribe((idSquadra: string) => {
                this.idSquadraHover = idSquadra;
            })
        );
        // Prendo "formValid"
        this.subscription.add(
            this.formValid$.subscribe((formValid: boolean) => {
                this.formValid = formValid;
            })
        );
        // Prendo Loading Liste Mezzi e Squadre
        this.subscription.add(
            this.loadingListe$.subscribe((loading: boolean) => {
                this.loadingListe = loading;
            })
        );
        this.initForm();
    }

    ngOnInit(): void {
        this.store.dispatch(new GetListaMezziSquadre(this.idRichiesta));
    }

    ngOnDestroy(): void {
        this.store.dispatch([
            new ClearListaMezziComposizione(),
            new ClearListaSquadreComposizione(),
            new ClearFiltriAffini(),
            new UnselectMezziAndSquadreComposizioneAvanzata(),
            new ClearBoxPartenze()
        ]);
    }

    initForm(): void {
        this.sostituzionePartenzaForm = new FormGroup({
            motivazioneAnnullamento: new FormControl(),
        });
        this.sostituzionePartenzaForm = this.fb.group({
            motivazioneAnnullamento: [null],
        });
    }

    get f(): any {
        return this.sostituzionePartenzaForm.controls;
    }

    onListaSquadrePartenza() {
        const listaSquadre = {} as ListaSquadre;
        listaSquadre.idPartenza = this.partenza.id;
        listaSquadre.squadre = this.partenza.squadre;
        this.store.dispatch(new VisualizzaListaSquadrePartenza(listaSquadre));
    }

    mezzoSelezionato(mezzoComposizione: MezzoComposizione): void {
        this.store.dispatch([
            new ReducerSelectMezzoComposizione(mezzoComposizione),
        ]);
        this.nuovoMezzo = mezzoComposizione.mezzo;
    }

    mezzoDeselezionato(mezzoComposizione: MezzoComposizione): void {
        this.store.dispatch(new UnselectMezzoComposizione());
        this.nuovoMezzo = {
            codice: '',
            descrizione: '',
            genere: '',
            stato: null,
            appartenenza: null,
            distaccamento: null,
            coordinate: null,
        };
    }

    mezzoHoverIn(mezzoComposizione: MezzoComposizione): void {
        this.store.dispatch([
            new HoverInMezzoComposizione(mezzoComposizione.id, mezzoComposizione.mezzo.coordinateFake),
        ]);
    }

    mezzoHoverOut(): void {
        this.store.dispatch([
            new HoverOutMezzoComposizione(),
        ]);
    }

    squadraSelezionata(squadraComposizione: SquadraComposizione): void {
        if (squadraComposizione && !squadraComposizioneBusy(squadraComposizione.squadra.stato)) {
            this.store.dispatch(new SelectSquadraComposizione(squadraComposizione));
        }
        this.nuoveSquadre.includes(squadraComposizione.squadra) ? null : this.nuoveSquadre.push(squadraComposizione.squadra);
    }

    squadraDeselezionata(squadraComposizione: SquadraComposizione): void {
        this.store.dispatch(new UnselectSquadraComposizione(squadraComposizione));
        let r = squadraComposizione.squadra;
        let a = this.nuoveSquadre.filter(e => e != r);
        this.nuoveSquadre = a;
    }

    squadraHoverIn(squadraComposizione: SquadraComposizione): void {
        this.store.dispatch(new HoverInSquadraComposizione(squadraComposizione.id));
    }

    squadraHoverOut(squadraComposizione: SquadraComposizione): void {
        this.store.dispatch(new HoverOutSquadraComposizione(squadraComposizione.id));
    }

    checkSquadraSelezione(idSquadra: string): boolean {
        let selected = false;
        this.idSquadreSelezionate.forEach((id: string) => {
            if (id === idSquadra) {
                selected = true;
            }
        });
        return selected;
    }

    changeRicercaSquadre(): void {
        this.store.dispatch(new SetRicercaSquadreComposizione(makeCopy(this.ricercaSquadre)));
    }

    changeRicercaMezzi(): void {
        this.store.dispatch(new SetRicercaMezziComposizione(makeCopy(this.ricercaMezzi)));
    }

    getTitle(): string {
        return 'Modifica Partenza Richiesta ' + this.codRichiesta;
    }

    onDismiss(): void {
        this.modal.close({ status: 'ko' });
    }

    closeModal(type: string) {
        this.modal.close({ status: type });
    }

    onConferma(): void {
        this.submitted = true;

        if (!this.sostituzionePartenzaForm.valid) {
            return;
        }

        const mezzo = this.store.selectSnapshot(MezziComposizioneState.mezzoSelezionato);
        const squadre = this.store.selectSnapshot(SquadreComposizioneState.squadreSelezionate);
        //per rimuovere squadre duplicate
        const squadreUnique = []; 
        let uniqueObject = {};
        for (let i in squadre) { 
            let objTitle = squadre[i]['id']; 
            uniqueObject[objTitle] = squadre[i]; 
        } 
        for (let i in uniqueObject) { 
            squadreUnique.push(uniqueObject[i]); 
        } 
        //-----------------------------
        this.modal.close({ status: 'ok', result: { mezzo: mezzo, squadre: squadreUnique, motivazioneAnnullamento: this.f.motivazioneAnnullamento.value } });
    }
}
