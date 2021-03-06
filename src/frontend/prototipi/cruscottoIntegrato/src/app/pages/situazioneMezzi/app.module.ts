import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MezzoinservizioComponent } from './mezzoinservizio/mezzoinservizio.component';
import { FriendlyDatePipe } from './shared/pipes/friendly-date.pipe';
import { FriendlyHourPipe } from './shared/pipes/friendly-hour.pipe';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { ListaMezziComponent } from './lista-mezzi/lista-mezzi.component';
import { ListaMezziService } from "./lista-mezzi/lista-mezzi.service";
import { TagAutistaComponent } from "./shared/components/tag-autista/tag-autista.component";
import { TagCapopartenzaComponent } from "./shared/components/tag-capopartenza/tag-capopartenza.component";
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [
    AppComponent,
    MezzoinservizioComponent,
    FriendlyDatePipe,
    FriendlyHourPipe,
    TruncatePipe,
    TagAutistaComponent,
    TagCapopartenzaComponent,
    ListaMezziComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [ListaMezziService],
  bootstrap: [AppComponent]
})
export class AppModule { }
