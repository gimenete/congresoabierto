using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace Parser
{
    public class SesionParser
    {
        private const string MARCA_INICIO_INTERVENCION = "<inicio_intervencion>";
        private IntervencionParser _intervencionParser = new IntervencionParser();

        public Sesion ParsearSesion(string rutaDeSesion)
        {
            FileInfo fileInfo = new FileInfo(rutaDeSesion);
            Sesion resultado = new Sesion();

            resultado.Identificador = fileInfo.Name.Substring(0, fileInfo.Name.Length - 5);
            resultado.Intervenciones = ParsearIntervenciones(File.ReadAllText(rutaDeSesion));

            return resultado;
        }

        public IntervencionCollection ParsearIntervenciones(string rawSession)
        {
            IList<string> rawIntervenciones =
                EliminarMarcasDeIntervenciones(
                        GetIntervenciones(
                            NormalizarIntervenciones(rawSession)));

            return EliminarIntervencionesIgnorables(
                        _intervencionParser.ParsearIntervenciones(rawIntervenciones));
        }

        private IntervencionCollection EliminarIntervencionesIgnorables(IList<Intervencion> intervenciones)
        {
            IntervencionCollection resultado = new IntervencionCollection();
            foreach (Intervencion intervencion in intervenciones)
            {
                if (intervencion.NombreDiputado.ToLower().Trim() != "presidente")
                {
                    resultado.Add(intervencion);
                }
            }
            return resultado;
        }

        private IList<string> GetIntervenciones(string sesionNormalizada)
        {
            MatchCollection iniciosDeIntervencion = GetIniciosDeIntervencion(sesionNormalizada);

            IList<string> resultado = new List<string>();
            for(int pos = 0; pos < iniciosDeIntervencion.Count; pos++)
            {
                resultado.Add(GetIntervencion(sesionNormalizada, pos, iniciosDeIntervencion));
            }
            return resultado;
        }

        private string GetIntervencion(string sesionNormalizada, int intervencionActual, MatchCollection iniciosDeIntervencion)
        {
            int inicioIntervencion = iniciosDeIntervencion[intervencionActual].Index;
            int finIntervencionIndex = sesionNormalizada.Length - inicioIntervencion;

            if (!EsUltimaIntervencion(intervencionActual, iniciosDeIntervencion))
            {
                finIntervencionIndex = iniciosDeIntervencion[intervencionActual + 1].Index - inicioIntervencion;
            }
            return sesionNormalizada.Substring(inicioIntervencion, finIntervencionIndex);
        }

        private IList<string> EliminarMarcasDeIntervenciones(IList<string> intervenciones)
        {
            IList<string> resultado = new List<string>();
            foreach (string intervencion in intervenciones)
            {
                resultado.Add(intervencion.Substring(MARCA_INICIO_INTERVENCION.Length + 1));
            }
            return resultado;
        }

        private bool EsUltimaIntervencion(int pos, MatchCollection iniciosDeIntervencion)
        {
            return pos == iniciosDeIntervencion.Count - 1;
        }

        private MatchCollection GetIniciosDeIntervencion(string normalizeSession)
        {
            Regex regex = new Regex(MARCA_INICIO_INTERVENCION, RegexOptions.IgnoreCase);
            return regex.Matches(normalizeSession);
        }

        public string NormalizarIntervenciones(string rawSession)
        {
            string resultado;

            resultado = rawSession.ToLower();
            resultado = NormalizarIntervencionesDeHombres(resultado);
            resultado = NormalizarIntervencionesDeMujeres(resultado);

            return resultado;
        }

        private string NormalizarIntervencionesDeMujeres(string rawSession)
        {
            return rawSession.Replace("<br>la señora", MARCA_INICIO_INTERVENCION);
        }

        private string NormalizarIntervencionesDeHombres(string rawSession)
        {
            return rawSession.Replace("<br>el señor", MARCA_INICIO_INTERVENCION);
        }
    }
}