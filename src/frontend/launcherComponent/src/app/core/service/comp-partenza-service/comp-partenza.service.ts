import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ListaComposizioneAvanzata } from '../../../shared/interface/lista-composizione-avanzata-interface';
import { ConfermaPartenze } from '../../../features/home/composizione-partenza/interface/conferma-partenze-interface';
import { FiltriComposizione } from 'src/app/features/home/composizione-partenza/interface/filtri/filtri-composizione-interface';
import { ListaComposizioneVeloce } from '../../../shared/interface/lista-composizione-veloce-interface';


const BASE_URL = environment.baseUrl;
const API_URL_SOCCORSO_AEREO = BASE_URL + environment.apiUrl.gestioneSoccorsoAereo;
const API_URL_PREACCOPPIATI = BASE_URL + environment.apiUrl.composizione.preaccoppiati;
const API_URL_AVANZATA = BASE_URL + environment.apiUrl.composizione.avanzata;
const API_URL_PRENOTAZIONE = BASE_URL + environment.apiUrl.composizione.prenotazione;
const API_URL_CONFERMA_PARTENZA = BASE_URL + environment.apiUrl.composizione.confermaPartenze;

@Injectable({
    providedIn: 'root'
})
export class CompPartenzaService {

    constructor(private http: HttpClient) {
    }

    getCategorieSoccorso(): Observable<any[]> {
      return this.http.get<any[]>(`${API_URL_SOCCORSO_AEREO}/GetCategorieSoccorso`);
    }

    getTipologieSoccorso(): Observable<any[]> {
      return this.http.get<any[]>(`${API_URL_SOCCORSO_AEREO}/GetTipologieSoccorso`);
    }

    addSoccorsoAereo(obj: any): Observable<any> {
      // todo: obj da definire
      return this.http.post(`${API_URL_SOCCORSO_AEREO}/AddSoccorsoAereo`, obj);
    }

    getListaComposizioneVeloce(obj: FiltriComposizione): Observable<ListaComposizioneVeloce> {
        return this.http.post<ListaComposizioneVeloce>(API_URL_PREACCOPPIATI, obj);
    }

    getListeComposizioneAvanzata(obj: FiltriComposizione): Observable<ListaComposizioneAvanzata> {
        return this.http.post<ListaComposizioneAvanzata>(API_URL_AVANZATA, obj);
    }

    setMezzoPrenotato(mezzoPrenotatoObj: any): Observable<any> {
        return this.http.post(`${API_URL_PRENOTAZIONE}/PrenotaMezzo`, mezzoPrenotatoObj);
    }

    removeMezzoPrenotato(mezzoPrenotatoObj: any): Observable<any> {
        return this.http.post(`${API_URL_PRENOTAZIONE}/SbloccaMezzo`, mezzoPrenotatoObj);
    }

    confermaPartenze(partenze: ConfermaPartenze): Observable<any> {
        return this.http.post(API_URL_CONFERMA_PARTENZA, partenze);
    }
}
