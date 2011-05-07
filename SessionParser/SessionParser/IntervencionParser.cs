using System;
using System.Collections.Generic;
using System.Linq;

namespace Parser
{
    public class IntervencionParser
    {
        public Intervencion ParsearIntervencion(string rawIntervencion)
        {
            Intervencion resultado = new Intervencion();
            
            resultado.NombreDiputado = GetNombreDiputado(rawIntervencion).Trim();
            resultado.Texto = rawIntervencion.Split(':')[1].Trim();

            return resultado;
        }

        private string GetNombreDiputado(string rawIntervencion)
        {
            string resultado;

            if (ContieneElCargo(rawIntervencion))
            {
                resultado =
                    rawIntervencion.Substring(
                        rawIntervencion.IndexOf("(") + 1,
                        rawIntervencion.IndexOf(")") - rawIntervencion.IndexOf("(") - 1);
            }
            else
            {
                resultado = rawIntervencion.Split(':')[0];
            }

            resultado = resultado.Replace("\n", "");
            while (resultado.Contains("  ")) resultado = resultado.Replace("  ", " ");

            return resultado;
        }

        private bool ContieneElCargo(string rawIntervencion)
        {
            return rawIntervencion.Substring(0, rawIntervencion.IndexOf(":")).Contains("(");
        }

        public IList<Intervencion> ParsearIntervenciones(IList<string> rawIntervenciones)
        {
            return rawIntervenciones.Select(ParsearIntervencion).ToList();
        }
    }
}