using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    public class BeneficiariosModel
    {
        public string Id { get; set; }

        [Required]
        public string CPF { get; set; }
        [Required]
        public string Nome { get; set; }
    }
}