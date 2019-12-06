﻿//-----------------------------------------------------------------------
// <copyright file="GetMezziMarker.cs" company="CNVVF">
// Copyright (C) 2017 - CNVVF
//
// This file is part of SOVVF.
// SOVVF is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// SOVVF is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/.
// </copyright>
//-----------------------------------------------------------------------
using Newtonsoft.Json;
using SO115App.API.Models.Classi.Condivise;
using SO115App.API.Models.Classi.Geo;
using SO115App.API.Models.Classi.Marker;
using SO115App.FakePersistence.JSon.Utility;
using SO115App.Models.Servizi.Infrastruttura.InfoRichiesta;
using SO115App.Models.Servizi.Infrastruttura.Marker;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace SO115App.FakePersistenceJSon.Marker
{
    /// <summary>
    ///   la classe recupera le informazioni dei mezzi che sono circoscritti in una determinata area mappa
    /// </summary>
    public class GetMezziMarker : IGetMezziMarker
    {
        private readonly IGetInfoRichiesta _getInfoRichiesta;

        public GetMezziMarker(IGetInfoRichiesta getInfoRichiesta)
        {
            _getInfoRichiesta = getInfoRichiesta;
        }

        /// <summary>
        ///   il metodo la classe recupera le informazioni dei mezzi e la loro posizione georeferenziata.
        /// </summary>
        /// <param name="filtroAreaMappa">un area mappa</param>
        /// <returns>Lista di MezziMarker</returns>
        public List<MezzoMarker> GetListaMezziMarker(AreaMappa filtroAreaMappa)
        {
            var listaMezziFilter = new List<MezzoMarker>();

            var filepath = CostantiJson.Mezzo;

            string json;
            using (var r = new StreamReader(filepath))
            {
                json = r.ReadToEnd();
            }

            var listaMezzi = JsonConvert.DeserializeObject<List<Mezzo>>(json);
            var listaMezziMarker = new List<MezzoMarker>();

            foreach (var mezzo in listaMezzi)
            {
                var mezzoMarker = new MezzoMarker()
                {
                    Mezzo = mezzo,
                    InfoRichiesta = _getInfoRichiesta.GetInfoRichiestaFromIdRichiestaMezzo(mezzo.IdRichiesta)
                };

                listaMezziMarker.Add(mezzoMarker);
            }

            if (filtroAreaMappa == null) return listaMezziMarker;

            listaMezziFilter.AddRange(listaMezziMarker.Where(mezzo => (mezzo.Mezzo.Coordinate.Latitudine >= filtroAreaMappa.BottomLeft.Latitudine) && (mezzo.Mezzo.Coordinate.Latitudine <= filtroAreaMappa.TopRight.Latitudine) && ((mezzo.Mezzo.Coordinate.Longitudine >= filtroAreaMappa.BottomLeft.Longitudine) && (mezzo.Mezzo.Coordinate.Longitudine <= filtroAreaMappa.TopRight.Longitudine))));

            return listaMezziFilter;
        }
    }
}
