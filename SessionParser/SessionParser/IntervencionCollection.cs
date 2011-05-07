using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Parser
{
    public class IntervencionCollection : List<Intervencion>
    {
        public IntervencionCollection(IEnumerable<Intervencion> intervenciones)
        {
            AddRange(intervenciones);
        }

        public Dictionary<string, int> GetTotalIntervencionesPorDiputado()
        {
            Dictionary<string, int> resultado = new Dictionary<string, int>();
            foreach (Intervencion intervencion in this)
            {
                if (resultado.ContainsKey(intervencion.NombreDiputado))
                {
                    resultado[intervencion.NombreDiputado]++;
                }
                else
                {
                    resultado.Add(intervencion.NombreDiputado, 1);
                }
            }
            return resultado;
        }
    }
}
