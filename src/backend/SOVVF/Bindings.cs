﻿//-----------------------------------------------------------------------
// <copyright file="Bindings.cs" company="CNVVF">
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
using Modello.Servizi.CQRS.Commands;
using Modello.Servizi.CQRS.Queries;
using SimpleInjector;
using SimpleInjector.Packaging;

namespace Modello
{
    /// <summary>
    ///   Package per la dependency injection del modello. Questo package associa alle interfacce dei
    ///   servizi le relative implementazioni (internal) presenti nello stesso assembly.
    /// </summary>
    public class Bindings : IPackage
    {
        /// <summary>
        ///   Registrazione dei servizi
        /// </summary>
        /// <param name="container">Il container</param>
        public void RegisterServices(Container container)
        {
            container.Register(
                typeof(ICommandHandler<>),
                new[] { typeof(ICommandHandler<>).Assembly });

            container.Register(
                typeof(IQueryHandler<,>),
                new[] { typeof(IQueryHandler<,>).Assembly });
        }
    }
}
