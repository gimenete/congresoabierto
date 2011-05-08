using System;
using System.Collections.Generic;

namespace Parser
{
    public class Intervencion
    {
        private TerminosParser _terminosParser = new TerminosParser();

        public string NombreDiputado { get; set; }

        private string _texto;
        public string Texto 
        {
            get { return _texto; }
            set
            {
                _texto = value;
                PesoDeTerminos = _terminosParser.GetPesoDeTerminosDeIntervencion(this);
            } 
        }
        
        public int TotalPalabras
        {
            get { return Texto.Split(' ').Length; }
        }

        public Dictionary<string, int> PesoDeTerminos { get; private set; }
    }
}