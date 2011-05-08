using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Parser
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args[0] == "sesion")
            {
                ParsearSesion(args);
            }
            else
            {
                ParsearDirectorioDeSesiones(args[1]);
            }
            Console.ReadKey();
        }

        private static void ParsearDirectorioDeSesiones(string path)
        {
            SesionParser parser = new SesionParser();
            SesionCollection sesiones = new SesionCollection();
            FileInfo[] infoFicheros = new DirectoryInfo(path).GetFiles();
            foreach (FileInfo ficheroSesion in infoFicheros)
            {
                Console.WriteLine("Procesando " + ficheroSesion.FullName + "...");
                sesiones.Add(parser.ParsearSesion(ficheroSesion.FullName));
            }
            Console.WriteLine("FIN DEL PROCESADO!!");

            IList<Diputado> diputados = 
                sesiones.GetDatosPorDiputados().OrderBy(x => x.Puntuacion).ToList();

            StreamWriter writer = new StreamWriter(File.OpenWrite(@"D:\Temporal\diputados.txt"));

            foreach (Diputado diputado in diputados)
            {

                Console.WriteLine(diputado.Nombre + " (" + diputado.Puntuacion + " ptos)");
                Console.WriteLine("    Normalizado: " + diputado.NombreNormalizado);
                Console.WriteLine("    Intervenciones: " + diputado.Intervenciones.Count);
                Console.WriteLine("    Total palabras: " + diputado.Intervenciones.TotalPalabras);
                Console.WriteLine("    Terminos......: ");
                foreach (string termino in diputado.Intervenciones.PesoDeTerminos.Keys)
                {
                    Console.WriteLine(
                        "        " + termino + " > " +
                        diputado.Intervenciones.PesoDeTerminos[termino]);
                }
                Console.WriteLine();

                writer.WriteLine(diputado.Nombre + " (" + diputado.Puntuacion + " ptos)");
                writer.WriteLine("    Normalizado: " + diputado.NombreNormalizado);
                writer.WriteLine("    Intervenciones: " + diputado.Intervenciones.Count);
                writer.WriteLine("    Total palabras: " + diputado.Intervenciones.TotalPalabras);
                writer.WriteLine("    Terminos......: ");
                foreach (string termino in diputado.Intervenciones.PesoDeTerminos.Keys)
                {
                    writer.WriteLine(
                        "        " + termino + " > " +
                        diputado.Intervenciones.PesoDeTerminos[termino]);
                }
                writer.WriteLine();
            }
            writer.Flush();
            writer.Close();
        }

        private static void ParsearSesion(string[] args)
        {
            string rawSession = File.ReadAllText(args[1]);
            SesionParser parser = new SesionParser();

            IntervencionCollection intervenciones = parser.ParsearIntervenciones(rawSession);

            Console.WriteLine("Total intervenciones: " + intervenciones.Count);
            Console.WriteLine();

            IList<Diputado> diputados = intervenciones.GetDatosPorDiputados();
            foreach (Diputado diputado in diputados)
            {
                Console.WriteLine(diputado.Nombre + " (" + diputado.Puntuacion + " ptos)");
                Console.WriteLine("    Normalizado: " + diputado.NombreNormalizado);
                Console.WriteLine("    Intervenciones: " + diputado.Intervenciones.Count);
                Console.WriteLine("    Total palabras: " + diputado.Intervenciones.TotalPalabras);
                Console.WriteLine("    Terminos......: ");
                foreach (string termino in diputado.Intervenciones.PesoDeTerminos.Keys)
                {
                    Console.WriteLine(
                        "        " + termino + " > " +
                        diputado.Intervenciones.PesoDeTerminos[termino]);
                }
                Console.WriteLine();
            }
        }
    }
}
