﻿using CQRS.Commands;
using CQRS.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SO115App.Models.Servizi.CQRS.Commands.GestioneSoccorso.GestioneIntervento.AnnullaRichiestaSoccorsoAereo;
using SO115App.Models.Servizi.CQRS.Commands.GestioneSoccorso.GestioneIntervento.InserisciRichiestaSoccorsoAereo;
using SO115App.Models.Servizi.CQRS.Queries.GestioneSoccorso.GestioneSoccorsoAereo.GetCategorieSoccorsoAereo;
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
        private readonly ICommandHandler<InserisciRichiestaSoccorsoAereoCommand> _inserisciRichiestaSoccorsoAereo;
        private readonly ICommandHandler<AnnullaRichiestaSoccorsoAereoCommand> _annullaRichiestaSoccorsoAereo;

        public GestioneSoccorsoAereoController(IQueryHandler<GetCategorieSoccorsoAereoQuery, GetCategorieSoccorsoAereoResult> getCategorieSoccorsoAereo,
            ICommandHandler<InserisciRichiestaSoccorsoAereoCommand> inserisciRichiestaSoccorsoAereo,
            ICommandHandler<AnnullaRichiestaSoccorsoAereoCommand> annullaRichiestaSoccorsoAereo)
        {
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
                throw e.GetBaseException();
            }
        }

        [HttpPost("InserisciRichiestaSoccorso")]
        public async Task<IActionResult> InserisciRichiestaSoccorso([FromBody] InserisciRichiestaSoccorsoAereoCommand command)
        {
            try
            {
                command.CodiciSede = Request.Headers["CodiceSede"].ToString().Split(",", StringSplitOptions.RemoveEmptyEntries);
                command.IdOperatore = Request.Headers["IdUtente"];

                _inserisciRichiestaSoccorsoAereo.Handle(command);

                return Ok();
            }
            catch (Exception e)
            {
                throw e.GetBaseException();
            }
        }

        [HttpPost("AnnullaRichiestaSoccorso")]
        public async Task<IActionResult> AnnullaRichiestaSoccorso([FromBody] AnnullaRichiestaSoccorsoAereoCommand command)
        {
            try
            {
                command.CodiciSede = Request.Headers["CodiceSede"].ToString().Split(",", StringSplitOptions.RemoveEmptyEntries);
                command.IdOperatore = Request.Headers["IdUtente"];

                _annullaRichiestaSoccorsoAereo.Handle(command);

                return Ok();
            }
            catch (Exception e)
            {
                throw e.GetBaseException();
            }
        }

        [HttpGet("GetTipologieSoccorso")]
        public async Task<IActionResult> GetTipologieSoccorso()
        {
            try
            {
                var idUtente = Request.Headers["IdUtente"];
                var codiciSede = Request.Headers["CodiceSede"].ToString().Split(",", StringSplitOptions.RemoveEmptyEntries);

                return null;
            }
            catch (Exception e)
            {
                throw e.GetBaseException();
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
                throw e.GetBaseException();
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
                throw e.GetBaseException();
            }
        }
    }
}
