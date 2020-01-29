import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/shared/model/utente.model';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { SetRicercaUtenti } from './store/actions/ricerca-utenti/ricerca-utenti.actons';
import { UtenteState } from '../navbar/store/states/operatore/utente.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUtenteDetail, GetUtentiGestione, OpenModalRemoveUtente } from './store/actions/gestione-utenti/gestione-utenti.actions';
import { GetRuoli } from './store/actions/ruoli/ruoli.actions';
import { RuoliState } from './store/states/ruoli/ruoli.state';
import { GestioneUtentiState } from './store/states/gestione-utenti/gestione-utenti.state';
import { RicercaUtentiState } from './store/states/ricerca-utenti/ricerca-utenti.state';
import { PaginationState } from '../../shared/store/states/pagination/pagination.state';
import { LoadingState } from '../../shared/store/states/loading/loading.state';
import { GestioneUtenteModalComponent } from './gestione-utente-modal/gestione-utente-modal.component';
import { GetUtenti } from '../../shared/store/actions/utenti/utenti.actions';

@Component({
    selector: 'app-gestione-utenti',
    templateUrl: './gestione-utenti.component.html',
    styleUrls: ['./gestione-utenti.component.css']
})
export class GestioneUtentiComponent implements OnInit {

    @Select(UtenteState.utente) user$: Observable<Utente>;
    @Select(GestioneUtentiState.listaUtenti) listaUtenti$: Observable<Utente[]>;
    @Select(GestioneUtentiState.utenteDetail) utenteGestioneDetail$: Observable<Utente>;
    @Select(RuoliState.ruoli) ruoli$: Observable<Array<any>>;
    @Select(RicercaUtentiState.ricerca) ricerca$: Observable<any>;
    @Select(PaginationState.limit) pageSize$: Observable<number>;
    @Select(PaginationState.totalItems) totalItems$: Observable<number>;
    @Select(PaginationState.page) page$: Observable<number>;
    @Select(LoadingState.loading) loading$: Observable<boolean>;

    private subscription: Subscription = new Subscription();

    constructor(public modalService: NgbModal,
                private store: Store) {
        this.getUtentiGestione();
        this.getRuoli();
        this.getRicerca();
    }

    onRicercaUtenti(ricerca: any) {
        this.store.dispatch(new SetRicercaUtenti(ricerca));
    }

    ngOnInit(): void {
    }

    onAddUtente() {
        const aggiungiUtenteModal = this.modalService.open(GestioneUtenteModalComponent, { backdropClass: 'light-blue-backdrop', centered: true, size: 'lg' });
        aggiungiUtenteModal.componentInstance.insertMode = true;
        aggiungiUtenteModal.result.then(
            (risultatoModal: any) => {
                // if (risultatoModal[0] === 'ok') {
                //     this.store.dispatch(new AddUtente(risultatoModal[1]));
                // }
                console.log('Modal "addUtente" chiusa con val ->', risultatoModal);
            },
            (err) => console.error('Modal chiusa senza bottoni. Err ->', err)
        );
        // TODO: DEBUG
        // console.warn('add utente modal');
    }

    onDetailUtente(id: string) {
        this.store.dispatch(new GetUtenteDetail(id));
        this.subscription.add(
            this.utenteGestioneDetail$.subscribe((utente: any) => {
                if (utente) {
                    const modificaUtenteModal = this.modalService.open(GestioneUtenteModalComponent, { backdropClass: 'light-blue-backdrop', centered: true, size: 'lg' });
                    modificaUtenteModal.componentInstance.detailMode = true;
                    modificaUtenteModal.componentInstance.utenteEdit = utente;
                    modificaUtenteModal.result.then((risultatoModal: any) => {
                            console.log('Modal "detailUtente" chiusa con val ->', risultatoModal);
                        },
                        (err) => console.error('Modal chiusa senza bottoni. Err ->', err)
                    );
                    // TODO: DEBUG
                    // const utente = event.utente.nome + ' ' + event.utente.cognome;
                    // const ruolo = event.ruoli;
                    // const sede = event.sede.descrizione;
                    // console.warn(utente + ' è diventato ' + ruolo + ' nel ' + sede);
                }
            })
        );
    }

    onModifyUtente(id: string) {
        this.store.dispatch(new GetUtenteDetail(id));
        this.subscription.add(
            this.utenteGestioneDetail$.subscribe((utente: any) => {
                if (utente) {
                    const modificaUtenteModal = this.modalService.open(GestioneUtenteModalComponent, { backdropClass: 'light-blue-backdrop', centered: true, size: 'lg' });
                    modificaUtenteModal.componentInstance.editMode = true;
                    modificaUtenteModal.componentInstance.utenteEdit = utente;
                    modificaUtenteModal.result.then((risultatoModal: any) => {
                            console.log('Modal "modifyUtente" chiusa con val ->', risultatoModal);
                        },
                        (err) => console.error('Modal chiusa senza bottoni. Err ->', err)
                    );
                    // this.store.dispatch(new UpdateUtenteGestione(utente));
                    // TODO: DEBUG
                    // const utente = event.utente.nome + ' ' + event.utente.cognome;
                    // const ruolo = event.ruoli;
                    // const sede = event.sede.descrizione;
                    // console.warn(utente + ' è diventato ' + ruolo + ' nel ' + sede);
                }
            })
        );
    }

    onRemoveUtente(id: string) {
        this.store.dispatch(new OpenModalRemoveUtente(id));
        // TODO: DEBUG
        // const utente = event.utente.nome + ' ' + event.utente.cognome;
        // const ruolo = event.ruoli;
        // const sede = event.sede.descrizione;
        // console.warn('remove utente modal (' + id + ')');
    }

    getUtentiGestione() {
        this.store.dispatch(new GetUtentiGestione());
    }

    getRuoli() {
        this.store.dispatch(new GetRuoli());
    }

    getRicerca() {
        this.ricerca$.subscribe(() => {
            this.store.dispatch(new GetUtentiGestione());
        });
    }
}
