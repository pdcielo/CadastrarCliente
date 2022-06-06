using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.DML
{
    public class Beneficiarios
    {
        /// <summary>
        /// Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// CEP
        /// </summary>
        public string CPF { get; set; }

        /// <summary>
        /// Cidade
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// E-mail
        /// </summary>
        public string IdCliente { get; set; }
    }

}

