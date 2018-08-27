import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PipeModule} from './pipes/pipe.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {SintesiRichiesteService} from './sintesi-richieste-service/sintesi-richieste.service';
import {SintesiRichiesteServiceFake} from './sintesi-richieste-service/sintesi-richieste.service.fake';
import {SintesiRichiestaComponent} from './sintesi-richiesta/sintesi-richiesta.component';
import {ListaRichiesteComponent} from './lista-richieste/lista-richieste.component';
import {FriendlyDatePipe} from './pipes/friendly-date.pipe';
import {FriendlyHourPipe} from './pipes/friendly-hour.pipe';
import {TagCapopartenzaComponent} from './shared/components/tag-capopartenza/tag-capopartenza.component';
import {TagAutistaComponent} from './shared/components/tag-autista/tag-autista.component';
import {TagRimpiazzoComponent} from './shared/components/tag-rimpiazzo/tag-rimpiazzo.component';
import {ComponenteComponent} from './componente/componente.component';
import {MezzoComponent} from './mezzo/mezzo.component';
import {FiltriComponent} from './filtri/filtri.component';
import {FiltroComponent} from './filtri/filtro/filtro.component';
import {RicercaRichiesteComponent} from './ricerca-richieste/ricerca-richieste.component';
import {CompetenzaComponent} from './competenza/competenza.component';
import {FriendlyTimePipe} from './pipes/friendly-time.pipe';
import {FriendlyDateTooltipPipe} from './pipes/friendly-date-tooltip.pipe';
import {DebounceClickDirective} from './directive/debounce-click';
import {DebounceKeyUpDirective} from './directive/debounce-keyup';
import {AgmCoreModule} from '@agm/core';
import {MapsComponent} from './maps/maps.component';
import {MapsService} from './maps/maps-service/maps-service.service';
import {MapsServiceFake} from './maps/maps-service/maps-service.service.fake';
import {googleApiKey} from './maps/apikey';
import {AnimationPipe} from './maps/maps-service/animation.pipe';

@NgModule({
    declarations: [
        AppComponent,
        SintesiRichiestaComponent,
        ListaRichiesteComponent,
        FriendlyDatePipe,
        FriendlyHourPipe,
        FriendlyTimePipe,
        FriendlyDateTooltipPipe,
        TagAutistaComponent,
        TagCapopartenzaComponent,
        TagRimpiazzoComponent,
        ComponenteComponent,
        MezzoComponent,
        FiltriComponent,
        FiltroComponent,
        RicercaRichiesteComponent,
        CompetenzaComponent,
        DebounceClickDirective,
        DebounceKeyUpDirective,
        MapsComponent,
        AnimationPipe,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule,
        PipeModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: googleApiKey.apiKey
        }),
        FormsModule
    ],
    providers: [
        {provide: SintesiRichiesteService, useClass: SintesiRichiesteService},
        {provide: MapsService, useClass: MapsService},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
