export class VoceFiltro {
    constructor(
        public codice: string,
        public categoria: string,
        public descrizione: string,
        public star: boolean,
        public selezionato?: boolean,
        public statico?: boolean,
        // server name
        public name?: string
    ) { }
}
