import { ListaSedi } from '../../../interface/lista-sedi';

export class SetListaSediTreeview {
    static readonly type = '[Sedi Treeview] Set lista sedi';

    constructor(public listaSedi: ListaSedi) {
    }
}

export class PatchListaSediNavbar {
    static readonly type = '[Sedi Treeview Navbar] Patch selezionati';

    constructor(public selected?: string[]) {
    }
}

export class ClearListaSediNavbar {
    static readonly type = '[Sedi Treeview Navbar] Clear selezionati';
}

export class PatchSediNavbarSelezionate {
    static readonly type = '[Sedi Treeview Navbar] Patch Sedi selezionate';

    constructor(public selected: string[], public multi?: boolean) {
    }
}

export class ClearSediNavbarSelezionate {
    static readonly type = '[Sedi Treeview Navbar] Clear Sedi selezionate';
}

export class SetSediNavbarSelezionate {
    static readonly type = '[Sedi Treeview Navbar] Set Sedi selezionate';
}

export class SetSediNavbarVisible {
    static readonly type = '[Sedi Treeview Navbar] Set Visible';
    constructor(public sediNavbarVisible: boolean = true) {
    }
}
