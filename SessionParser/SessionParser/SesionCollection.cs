using System.Collections.Generic;
using System.Linq;

namespace Parser
{
    public class SesionCollection : List<Sesion>
    {
        public IList<Diputado> GetDatosPorDiputados()
        {
            Dictionary<string, Diputado> resultado = new Dictionary<string, Diputado>();
            foreach (Sesion sesion in this)
            {
                IList<Diputado> diputados = sesion.Intervenciones.GetDatosPorDiputados();
                foreach (Diputado diputado in diputados)
                {
                    if (resultado.ContainsKey(diputado.NombreNormalizado))
                    {
                        resultado[diputado.NombreNormalizado].Intervenciones.AddRange(diputado.Intervenciones);
                    }
                    else
                    {
                        resultado.Add(diputado.NombreNormalizado, diputado);
                    }
                }
            }
            return resultado.Values.ToList();
        }
    }
}
