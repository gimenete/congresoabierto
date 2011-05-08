using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Parser
{
    public class IntervencionCollection : List<Intervencion>
    {
        public IntervencionCollection()
        {
        }

        public int TotalPalabras
        {
            get { return this.Sum(x => x.TotalPalabras); }
        }

        public Dictionary<string, int> PesoDeTerminos
        {
            get 
            { 
                Dictionary<string, int> resultado = new Dictionary<string, int>();
                foreach (Intervencion intervencion in this)
                {
                    foreach (string key in intervencion.PesoDeTerminos.Keys)
                    {
                        if (resultado.ContainsKey(key))
                        {
                            resultado[key] += intervencion.PesoDeTerminos[key];
                        }
                        else
                        {
                            resultado.Add(key, intervencion.PesoDeTerminos[key]);
                        }
                    }
                }
                return resultado;
            }
        }

        public int TotalPesoDeTerminos
        {
            get { return PesoDeTerminos.Sum(x => x.Value); }
        }

        public IntervencionCollection(IEnumerable<Intervencion> intervenciones)
        {
            AddRange(intervenciones);
        }

        public IList<Diputado> GetDatosPorDiputados()
        {
            Dictionary<string, Diputado> resultado = new Dictionary<string, Diputado>();
            foreach (Intervencion intervencion in this)
            {
                if (resultado.ContainsKey(intervencion.NombreDiputado))
                {
                    resultado[intervencion.NombreDiputado].Intervenciones.Add(intervencion);
                }
                else
                {
                    Diputado nuevoDiputado = new Diputado();
                    nuevoDiputado.Nombre = intervencion.NombreDiputado;
                    nuevoDiputado.Intervenciones.Add(intervencion);

                    resultado.Add(intervencion.NombreDiputado, nuevoDiputado);
                }
            }
            return resultado.Values.ToList<Diputado>();
        }
    }
}
