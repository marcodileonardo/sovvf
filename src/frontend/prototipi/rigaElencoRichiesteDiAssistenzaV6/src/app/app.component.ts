import {Component, OnInit} from '@angular/core';
import {SintesiRichiesta} from './shared/model/sintesi-richiesta.model';
import {SintesiRichiesteService} from './lista-richieste/lista-richieste-service/sintesi-richieste-service/sintesi-richieste.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
