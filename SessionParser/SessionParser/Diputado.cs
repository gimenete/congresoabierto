namespace Parser
{
    public class Diputado
    {
        public string Nombre { get; set; }
        public IntervencionCollection Intervenciones { get; private set; }
        public int Puntuacion
        {
            get 
            { 
                int total = 0;
                total += Intervenciones.TotalPalabras;
                total += Intervenciones.TotalPesoDeTerminos;
                total += Intervenciones.Count * 5;
                return total;
            }
        }

        public string NombreNormalizado
        {
            get
            {
                string resultado = Nombre.ToLower();
                resultado =
                    resultado.Replace("á", "a").Replace("é", "e").Replace("í", "i").Replace("ó", "o").Replace("ú", "u")
                             .Replace("à", "a").Replace("è", "e").Replace("ì", "i").Replace("ò", "o").Replace("ù", "u");
                while (resultado.Contains("  ")) resultado = resultado.Replace("  ", " ");
                resultado = resultado.Replace(" ", "-").Replace("Ç", "c");
                resultado = resultado.Trim();

                return resultado;
            }
        }

        public Diputado()
        {
            Intervenciones = new IntervencionCollection();
        }
    }
}
