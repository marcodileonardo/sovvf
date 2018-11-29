import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Models
import { Mezzo } from '../../../shared/model/mezzo.model';
import { Squadra } from '../../../shared/model/squadra.model';
import { MezzoComposizione } from "../../../composizione-partenza/model/mezzo-composizione.model";
import { Componente } from '../../../shared/model/componente.model';
import { PreAccoppiato } from '../../../composizione-partenza/model/pre-accoppiato.model';



@Injectable({
  providedIn: 'root'
})
export class CompPartenzaServiceFake {
  preAccoppiati: PreAccoppiato[];
  mezzi: MezzoComposizione[];
  squadre: Squadra[];

  constructor() {
  }

  public getPreAccoppiati(): Observable<PreAccoppiato[]> {
    this.preAccoppiati = [
      new PreAccoppiato('1',
        new Mezzo('1', 'A1', 'APS', 'inSede', [], 0),
        new Squadra('Rossa', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        23.5,
        '24 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('2', 'A2', 'APS', 'inSede', [], 0),
        new Squadra('Verde', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('3', 'A3', 'APS', 'inSede', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('4', 'A4', 'APS', 'inSede', [], 0),
        new Squadra('Marrone', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Ostiense',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('5', 'A5', 'APS', 'inSede', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Ostiense',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('6', 'A6', 'APS', 'inSede', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolana I',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('7', 'A7', 'APS', 'inRientro', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('8', 'A8', 'APS', 'inRientro', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('9', 'A9', 'APS', 'inRientro', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('10', 'A10', 'APS', 'inRientro', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Ostiense',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('11', 'A11', 'APS', 'inRientro', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolana I',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('12', 'A12', 'APS', 'inRientro', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolana I',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('13', 'A13', 'APS', 'inViaggio', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('14', 'A14', 'APS', 'inViaggio', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('15', 'A15', 'APS', 'inViaggio', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Ostiense',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('16', 'A16', 'APS', 'inViaggio', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolana I',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('17', 'A17', 'APS', 'inViaggio', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolana I',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('18', 'A18', 'APS', 'sulPosto', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('19', 'A19', 'APS', 'sulPosto', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        5.5,
        '6 min.'
      ),
      new PreAccoppiato('2',
        new Mezzo('20', 'A20', 'APS', 'sulPosto', [], 0),
        new Squadra('Gialla', 'inSede', [
          new Componente('QF', 'Mario Verdi', '', true, false, false),
          new Componente('QF', 'Roberto Merlo', '', false, true, false),
          new Componente('QF', 'Francesca De Simone', '', false, false, false),
          new Componente('QF', 'Emanuele Catti', '', false, false, false),
          new Componente('QF', 'Mariangela Rossi', '', false, false, false),
        ]),
        'Tuscolano II',
        5.5,
        '6 min.'
      )
    ];

    return of(this.preAccoppiati);
  }

  public getMezziComposizione(): Observable<MezzoComposizione[]> {
    this.mezzi = [
      new MezzoComposizione(
        '1',
        new Mezzo('1',
        'A1',
        'APS',
        'inSede',
        [
          new Squadra('Rossa',
            'InSede',
            [
              new Componente('CP', 'Mario Rossi', '', true, false, false)
            ]
          )
        ],
        0
      ),
      '20.2 km',
      '20 min'
      ),
      new MezzoComposizione(
        '2',
        new Mezzo('2',
        'A2',
        'APS',
        'inSede',
        [
          new Squadra('Gialla',
            'InSede',
            [
              new Componente('CP', 'Francesco Verdi', '', true, false, false)
            ]
          )
        ],
        0
      ),
      '34.6 km',
      '43 min'
      ),
    ];

    return of(this.mezzi);
  }

  public getSquadre(): Observable<Squadra[]> {
    this.squadre = [
      new Squadra('Rossa',
      'InSede',
      [
        new Componente('CP', 'Mario Rossi', '', true, false, false),
        new Componente('AA', 'Mario Rossi', '', false, false, false),
        new Componente('BB', 'Mario Rossi', '', false, false, false),
        new Componente('CC', 'Mario Rossi', '', false, false, false),
        new Componente('DD', 'Mario Rossi', '', false, false, false),
      ]
      ),
      new Squadra('Gialla',
      'InSede',
      [
        new Componente('CP', 'Francesco Verdi', '', true, false, false),
        new Componente('EE', 'Francesco Verdi', '', false, false, false),
        new Componente('FF', 'Francesco Verdi', '', false, false, false),
        new Componente('GG', 'Francesco Verdi', '', false, false, false),
      ]
      )
    ];

    return of(this.squadre);
  }
}
