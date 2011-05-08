using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Parser
{
    public class TerminosParser
    {
        private IList<Termino> _terminos = new List<Termino>();

        public TerminosParser()
        {
            InicializarTerminos();
        }

        public TerminosParser(IList<Termino> terminos)
        {
            _terminos = terminos;
        }

        private void InicializarTerminos()
        {
            _terminos.Add(new Termino { Clave = "energía atómica", Sinonimos = new[] { "atómica", "radiactividad", "nuclear" }, Peso = 2 });
            _terminos.Add(new Termino { Clave = "guerra", Sinonimos = new[] { "bombas", "armas" }, Peso = 5 });
        }

        public Dictionary<string, int> GetPesoDeTerminosDeIntervencion(Intervencion intervencion)
        {
            Dictionary<string, int> resultado = new Dictionary<string, int>();
            foreach (Termino termino in _terminos)
            {
                if (CalcularPesoTotalDeTermino(termino, intervencion.Texto) > 0)
                {
                    resultado.Add(termino.Clave, CalcularPesoTotalDeTermino(termino, intervencion.Texto));
                }
            }
            return resultado;
        }

        private int CalcularPesoTotalDeTermino(Termino termino, string texto)
        {
            int total = 0;
            foreach (string sinonimo in termino.Sinonimos)
            {
                Regex regex = new Regex(sinonimo);
                total += regex.Matches(texto).Count * termino.Peso;
            }
            return total;
        }
    }
}
