import { SchedaContattoMarker } from '../../../maps/maps-model/scheda-contatto.model';
import { SchedaContatto } from '../../../../../shared/interface/scheda-contatto.interface';

export class SetSchedeContattoMarkers {
    static readonly type = '[Schede Contatto Marker] Set Schede Contatto Marker';

    constructor(public schedeContatto: SchedaContatto[]) {
    }
}

export class PatchSchedeContattoMarkers {
    static readonly type = '[Schede Contatto Marker] Patch Schede Contatto Markers';

    constructor(public payload: SchedaContattoMarker[]) {
    }
}

export class AddSchedeContattoMarkers {
    static readonly type = '[Schede Contatto Marker] Add Schede Contatto Markers';

    constructor(public payload: SchedaContattoMarker[]) {
    }
}

export class InsertSchedaContattoMarker {
    static readonly type = '[Schede Contatto Marker] Insert Scheda Contatto Marker';

    constructor(public payload: SchedaContattoMarker, public before?: number) {
    }
}

export class UpdateSchedaContattoMarker {
    static readonly type = '[Schede Contatto Marker] Update Scheda Contatto Marker';

    constructor(public payload: SchedaContattoMarker) {
    }
}

export class RemoveSchedaContattoMarker {
    static readonly type = '[Schede Contatto Marker] Remove Scheda Contatto Marker';

    constructor(public payload: string) {
    }
}


export class SetSchedaContattoMarkerById {
    static readonly type = '[Schede Contatto Marker] Set Schede Contatto Marker by ID';

    constructor(public id?: string) {
    }
}

export class OpacizzaSchedeContattoMarkers {
    static readonly type = '[Schede Contatto Marker] Opacizza Schede Contatto Marker';
}

export class ClearSchedeContattoMarkers {
    static readonly type = '[Schede Contatto Marker] Clear Schede Contatto Marker';
}
