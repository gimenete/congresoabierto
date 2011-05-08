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
_terminos.Add(new Termino { Clave = "empleo", Sinonimos = new[] { "paro" }, Peso = 82 });
_terminos.Add(new Termino { Clave = "drogas", Sinonimos = new[] {
"cocaína", "heroína", "marihuana", "hachis", "porro", "porros"}, Peso =
1 });
_terminos.Add(new Termino { Clave = "inseguridad", Sinonimos = new[] {
"altercados", "altercado", "robo", "homicidio", "asesinato",
"asesino", "violación", "disturbios", "antidisturbios"}, Peso = 8 });
_terminos.Add(new Termino { Clave = "terrorismo", Sinonimos = new[] {
"atentado", "comando", "eta", "qaeda", "ladem", "laden", "osama",
"11M", "11S", "11-M", "11-S"}, Peso = 5 });
_terminos.Add(new Termino { Clave = "infraestructuras", Sinonimos =
new[] { "carretera", "viaducto", "autovia", "autopista", "tren",
"tunel", "puerto", "estacion"}, Peso = 1 });
_terminos.Add(new Termino { Clave = "salud y sanidad", Sinonimos =
new[] { "salud", "sanidad", "hospital", "quirofano", "farmacos",
"farmaco"}, Peso = 3 });
_terminos.Add(new Termino { Clave = "vivienda", Sinonimos = new[] {
"vpo", "alquiler", "piso"}, Peso = 5 });
_terminos.Add(new Termino { Clave = "economía", Sinonimos = new[] {
"crisis", "financiera", "presupuestos", "gasto", "deficit",
"inflacion", "recesion", "deuda"}, Peso = 47 });
_terminos.Add(new Termino { Clave = "pensiones", Sinonimos = new[] {
"pension"}, Peso = 3 });
_terminos.Add(new Termino { Clave = "clase politica", Sinonimos =
new[] { "fraude", "gurtel", "gürtel", "tránsfuga", "transfuguismo",
"prevaricacion", "malversacion"}, Peso = 26 });
_terminos.Add(new Termino { Clave = "guerra", Sinonimos = new[] {
"afganistán", "irak", "balcanes", "palestina", "israel", "libia"}, Peso
= 1 });
_terminos.Add(new Termino { Clave = "justicia", Sinonimos = new[] {
"juez", "jueces", "fiscal", "abogado", "abogada", "condena",
"condenado", "cárcel"}, Peso = 1 });
_terminos.Add(new Termino { Clave = "racismo", Sinonimos = new[] {
"racista", "racistas", "xenofobia", "xenófobo"}, Peso = 1 });
_terminos.Add(new Termino { Clave = "inmigracion", Sinonimos = new[] {
"inmigrante", "inmigrantes", "patera", "kayuko"}, Peso = 12 });
_terminos.Add(new Termino { Clave = "violencia machista", Sinonimos =
new[] { "machista", "machismo"}, Peso = 1 });
_terminos.Add(new Termino { Clave = "jueventud", Sinonimos = new[] {
"joven", "jovenes"}, Peso = 2 });
_terminos.Add(new Termino { Clave = "educacion", Sinonimos = new[] {
"universidad", "universidades", "instituto", "institutos", "alumno",
"alumnos", "profesor", "profesores", "profesorado", "escuela",
"escuelas"}, Peso = 5 });
_terminos.Add(new Termino { Clave = "medioambiente", Sinonimos = new[]
{ "bosque", "bosques", "chapapote", "vertido", "residuo", "residuos",
"toxico", "caza", "pesca", "extincion", "contaminacion"},
                            Peso = 1
});
_terminos.Add(new Termino { Clave = "nacionalismos", Sinonimos = new[]
{ "nacionalismo", "independentismo", "independentistas",
"autodeterminacion"}, Peso = 1 });
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
