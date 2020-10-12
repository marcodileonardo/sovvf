﻿//-----------------------------------------------------------------------
// <copyright file="PreAccoppiatiQueryHandler.cs" company="CNVVF">
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
using System.Collections.Generic;
using System.Linq;
using CQRS.Queries;
using Serilog;
using SO115App.API.Models.Classi.Composizione;
using SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.Composizione.ComposizioneMezzi;
using SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.Composizione.ComposizioneSquadre;
using SO115App.Models.Servizi.Infrastruttura.GetComposizioneSquadre;
using SO115App.Models.Servizi.Infrastruttura.GetPreAccoppiati;

namespace SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.Composizione.PreAccoppiati
{
    /// <summary>
    ///   Servizio che restituisce tutti i valori dei Box presenti in HomePage.
    /// </summary>
    public class PreAccoppiatiQueryHandler : IQueryHandler<PreAccoppiatiQuery, PreAccoppiatiResult>
    {
        private readonly IGetPreAccoppiati _iGetPreAccoppiati;

        public PreAccoppiatiQueryHandler(IGetPreAccoppiati iGetPreAccoppiati)
        {
            this._iGetPreAccoppiati = iGetPreAccoppiati;
        }

        /// <summary>
        ///   Query che estrae i valori dei Box presenti in Home Page
        /// </summary>
        /// <param name="query">Filtri utilizzati per l'estrazione</param>
        /// <returns>Elenco dei mezzi disponibili</returns>
        public PreAccoppiatiResult Handle(PreAccoppiatiQuery query)
        {
            Log.Debug("Inizio elaborazione Lista Preaccoppiati Composizione Handler");

            var ListapreAccoppiati = _iGetPreAccoppiati.GetFake(query)
                .Skip(query.Pagination.PageSize * (query.Pagination.Page - 1))
                .Take(query.Pagination.PageSize).ToList();

            Log.Debug("Fine elaborazione Lista Preaccoppiati Composizione Handler");

            return new PreAccoppiatiResult()
            {
                preAccoppiati = ListapreAccoppiati,
                Pagination = new SO115App.Models.Classi.Condivise.Paginazione()
                {
                    Page = query.Pagination.Page,
                    PageSize = query.Pagination.PageSize,
                    TotalItems = ListapreAccoppiati.Count
                }
            };
        }
    }
}
