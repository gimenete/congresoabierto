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

            IList<string> intervenciones = parser.ParsearIntervenciones(rawSession);

            foreach(string intervencion in intervenciones)
            {
                Console.WriteLine("#######################");
                Console.WriteLine(intervencion);
            }
            Console.WriteLine("Total intervenciones: " + intervenciones.Count);
            Console.ReadKey();
        }
    }
}
