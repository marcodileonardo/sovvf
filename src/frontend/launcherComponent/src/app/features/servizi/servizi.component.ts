import { Component, isDevMode, OnDestroy, OnInit } from '@angular/core';

@Component({
    templateUrl: './servizi.component.html'
})
export class ServiziComponent implements OnInit, OnDestroy {

    constructor() {
    }

    ngOnInit(): void {
        if (isDevMode()) {
            console.log('Componente Servizi creato');
        }
    }

    ngOnDestroy(): void {
        if (isDevMode()) {
            console.log('Componente Servizi distrutto');
        }
    }

}
