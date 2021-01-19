﻿using CQRS.Commands;
using CQRS.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SO115App.Models.Classi.ServiziEsterni.AFM;
using SO115App.Models.Servizi.CQRS.Commands.GestioneSoccorso.GestioneIntervento.AnnullaRichiestaSoccorsoAereo;
using SO115App.Models.Servizi.CQRS.Commands.GestioneSoccorso.GestioneIntervento.InserisciRichiestaSoccorsoAereo;
using SO115App.Models.Servizi.CQRS.Queries.GestioneSoccorso.GestioneSoccorsoAereo.GetCategorieSoccorsoAereo;
using SO115App.Models.Servizi.CQRS.Queries.GestioneSoccorso.GestioneSoccorsoAereo.GetTipologieSoccorsoAereo;
using System;
using System.Threading.Tasks;

namespace SO115App.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GestioneSoccorsoAereoController : ControllerBase
    {
        private readonly IQueryHandler<GetCategorieSoccorsoAereoQuery, GetCategorieSoccorsoAereoResult> _getCategorieSoccorsoAereo;
        private readonly IQueryHandler<GetTipologieSoccorsoAereoQuery, GetTipologieSoccorsoAereoResult> _getTipologieSoccorsoAereo;
        private readonly ICommandHandler<InserisciRichiestaSoccorsoAereoCommand> _inserisciRichiestaSoccorsoAereo;
        private readonly ICommandHandler<AnnullaRichiestaSoccorsoAereoCommand> _annullaRichiestaSoccorsoAereo;

        public GestioneSoccorsoAereoController(IQueryHandler<GetCategorieSoccorsoAereoQuery, GetCategorieSoccorsoAereoResult> getCategorieSoccorsoAereo,
            IQueryHandler<GetTipologieSoccorsoAereoQuery, GetTipologieSoccorsoAereoResult> getTipologieSoccorsoAereo,
            ICommandHandler<InserisciRichiestaSoccorsoAereoCommand> inserisciRichiestaSoccorsoAereo,
            ICommandHandler<AnnullaRichiestaSoccorsoAereoCommand> annullaRichiestaSoccorsoAereo)
        {
            _getTipologieSoccorsoAereo = getTipologieSoccorsoAereo;
            _getCategorieSoccorsoAereo = getCategorieSoccorsoAereo;
            _inserisciRichiestaSoccorsoAereo = inserisciRichiestaSoccorsoAereo;
            _annullaRichiestaSoccorsoAereo = annullaRichiestaSoccorsoAereo;
        }

        [HttpGet("GetCategorieSoccorso")]
        public async Task<IActionResult> GetCategorieSoccorso()
        {
            try
            {
                var query = new GetCategorieSoccorsoAereoQuery() 
                {
                    CodiciSede = Request.Headers["CodiceSede"].ToString().Split(",", StringSplitOptions.RemoveEmptyEntries),
                    IdOperatore = Request.Headers["IdUtente"]
                };

                var result = _getCategorieSoccorsoAereo.Handle(query);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPost("Inserisci")]
        public async Task<IActionResult> Inserisci([FromBody] NuovaRichiestaSoccorsoAereo richiesta)
        {
            try
            {
                var command = new InserisciRichiestaSoccorsoAereoCommand()
                {
                    CodiciSede = Request.Headers["CodiceSede"].ToString().Split(",", StringSplitOptions.RemoveEmptyEntries),
                    IdOperatore = Request.Headers["IdUtente"],
                    RichiestaSoccorsoAereo = richiesta
                };

                _inserisciRichiestaSoccorsoAereo.Handle(command);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPost("Annulla")]
        public async Task<IActionResult> Annulla([FromBody] AnnullaRichiestaSoccorsoAereo richiesta)
        {
            try
            {
                var command = new AnnullaRichiestaSoccorsoAereoCommand()
                {
                    CodiciSede = Request.Headers["CodiceSede"].ToString().Split(",", StringSplitOptions.RemoveEmptyEntries),
                    IdOperatore = Request.Headers["IdUtente"],
                    Codice = Request.Headers["CodiceRichiesta"],
                    Annullamento = richiesta
                };

                _annullaRichiestaSoccorsoAereo.Handle(command);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpGet("GetTipologieSoccorso")]
        public async Task<IActionResult> GetTipologieSoccorso()
        {
            try
            {
                var query = new GetTipologieSoccorsoAereoQuery()
                {
                    CodiciSede = Request.Headers["CodiceSede"].ToString().Split(",", StringSplitOptions.RemoveEmptyEntries),
                    IdOperatore = Request.Headers["IdUtente"]
                };

                var result = _getTipologieSoccorsoAereo.Handle(query);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpGet("GetInfoRichiestaSoccorso")]
        public async Task<IActionResult> GetInfoRichiestaSoccorso(string requestKey)
        {
            try
            {
                var idUtente = Request.Headers["IdUtente"];
                var codiciSede = Request.Headers["CodiceSede"].ToString().Split(",", StringSplitOptions.RemoveEmptyEntries);

                return null;
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpGet("GetStoricoRichiestaSoccorso")]
        public async Task<IActionResult> GetStoricoRichiestaSoccorso(string requestKey)
        {
            try
            {
                var idUtente = Request.Headers["IdUtente"];
                var codiciSede = Request.Headers["CodiceSede"].ToString().Split(",", StringSplitOptions.RemoveEmptyEntries);

                return null;
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }
    }
}
