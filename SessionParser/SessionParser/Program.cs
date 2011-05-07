using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Parser
{
    class Program
    {
        static void Main(string[] args)
        {
            string rawSession = File.ReadAllText(args[0]);
            SessionParser parser = new SessionParser();

            IntervencionCollection intervenciones = parser.ParsearIntervenciones(rawSession);

            /*foreach(Intervencion intervencion in intervenciones)
            {
                Console.WriteLine("#######################");
                Console.WriteLine("Diputado: " + intervencion.NombreDiputado);
                Console.WriteLine(intervencion.Texto);
            }*/
            Console.WriteLine("Total intervenciones: " + intervenciones.Count);
            Console.WriteLine();

            Dictionary<string, int> diputados = intervenciones.GetTotalIntervencionesPorDiputado();
            foreach(string diputado in diputados.Keys)
            {
                Console.WriteLine(diputado + " : " + diputados[diputado]);
            }

            Console.ReadKey();
        }
    }
}
