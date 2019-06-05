﻿using Newtonsoft.Json;
using SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.Composizione.ComposizioneMezzi;
using SO115App.Models.Servizi.Infrastruttura.GetComposizioneMezzi;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using SO115App.API.Models.Classi.Composizione;
using SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.Composizione.MezzoPrenotato;
using SO115App.Models.Servizi.Infrastruttura.GetMezzoPrenotato;

namespace SO115App.FakePersistenceJSon.Composizione
{
    public class GetMezzoPrenotato : IGetMezzoPrenotato
    {
        public ComposizioneMezzi Get(MezzoPrenotatoQuery query)
        {
            //TODO PARTE CHIAMATA DB

            //TODO DA MODIFICARE CON LA CONNESSIONE AL DB PER IL REPERIMENTO DEI DATI DEFINITIVI
            //DATI FAKE - ORA LI LEGGO DA FILE
            List<ComposizioneMezzi> mezzi = new List<ComposizioneMezzi>();
            ComposizioneMezzi mezzo = new ComposizioneMezzi();
            string filepath = "Fake/MezziComposizione.json";
            string json;
            using (StreamReader r = new StreamReader(filepath))
            {
                json = r.ReadToEnd();
            }

            mezzi = JsonConvert.DeserializeObject<List<ComposizioneMezzi>>(json);
            mezzo = mezzi.Where(x => x.Mezzo.Codice.Equals(query.MezzoPrenotato.IdMezzoComposizione)).FirstOrDefault();
            return mezzo;
        }
    }
}
