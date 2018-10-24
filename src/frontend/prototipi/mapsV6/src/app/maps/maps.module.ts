import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipeModule} from '../shared/pipes/pipe.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../environments/environment';
import {ComponenteComponent, DebounceClickDirective} from '../shared';
/**
 * AGM CORE
 */
import {AgmCoreModule} from '@agm/core';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
/**
 * MAPS
 */
import {MapsComponent} from './maps.component';
import {AgmComponent} from './agm/agm.component';
import {AgmContentComponent} from './agm/agm-content.component';
/**
 * MAPS-UI
 */
import {MapsFiltroComponent} from './maps-ui/filtro/filtro.component';
import {InfoWindowComponent} from './maps-ui/info-window/info-window.component';
import {CambioSedeModalComponent} from './maps-ui/info-window/cambio-sede-modal/cambio-sede-modal.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        PipeModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: environment.apiUrl.maps.agm.key
        }),
        AgmJsMarkerClustererModule,
        AgmSnazzyInfoWindowModule
    ],
    declarations: [
        DebounceClickDirective,
        ComponenteComponent,
        MapsComponent,
        AgmComponent,
        AgmContentComponent,
        MapsFiltroComponent,
        InfoWindowComponent,
        CambioSedeModalComponent
    ],
    entryComponents: [CambioSedeModalComponent],
    exports: [
        MapsComponent
    ]
})
export class MapsModule {
}
