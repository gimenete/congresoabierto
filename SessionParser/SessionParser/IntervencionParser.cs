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

            if (rawIntervencion.Contains("tiene la palabra.")) return null;

            if (!rawIntervencion.Contains(":")) return null;
            if (rawIntervencion.Contains("<br>"))
            {
                string primeraLinea = rawIntervencion.Substring(0, rawIntervencion.IndexOf("<br>"));
                if (!primeraLinea.Contains(":")) return null;
            }

            if (rawIntervencion.Length > 200)
            {
                if (!rawIntervencion.Substring(0, 200).Contains(":")) return null;
            }

            resultado.NombreDiputado = GetNombreDiputado(rawIntervencion).Trim();
            resultado.Texto = rawIntervencion.Split(':')[1].Trim();

            if (resultado.NombreDiputado.Split(' ').Length > 5) return null;

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
            IList<Intervencion> intervenciones = new List<Intervencion>();
            foreach (string rawIntervencion in rawIntervenciones)
            {
                Intervencion intervencion = ParsearIntervencion(rawIntervencion);
                if (intervencion != null)
                {
                    intervenciones.Add(intervencion);
                }
            }
            return intervenciones;
        }
    }
}