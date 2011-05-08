using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Parser;

namespace SersionParserTests
{
    [TestClass]
    public class ParsearTerminos
    {
        private IList<Termino> _terminos;
        private TerminosParser _parser;

        [TestInitialize]
        public void TestInitialize()
        {
            _terminos = new List<Termino>();
            _terminos.Add(new Termino { Clave = "empleo", Sinonimos = new[] { "empleo", "trabajamos" }, Peso = 2 });
            _terminos.Add(new Termino { Clave = "guerra", Sinonimos = new[] { "guerra", "bomba", "bala" }, Peso = 4 });
            _terminos.Add(new Termino { Clave = "alcohol", Sinonimos = new[] { "alcohol", "alcohol", "cubata" }, Peso = 1 });
            _parser = new TerminosParser(_terminos);
        }

        [TestMethod]
        public void Parsear_una_palabra_clave()
        {
            Intervencion intervencion =
                new Intervencion
                    {
                        NombreDiputado = "pepe",
                        Texto = "Menudo empleo este, trabajamos 14 horas diarias"
                    };

            Dictionary<string, int> pesoDeTerminos = _parser.GetPesoDeTerminosDeIntervencion(intervencion);

            Assert.AreEqual(1, pesoDeTerminos.Count);
            Assert.AreEqual(4, pesoDeTerminos["empleo"]);
        }

        [TestMethod]
        public void Parsear_varias_palabras_clave()
        {
            Intervencion intervencion =
                new Intervencion
                    {
                        NombreDiputado = "pepe",
                        Texto = "Menudo empleo este, trabajamos 14 horas diarias\n" +
                                "y en las guerras no hay más que bombas y balas"
                };

            Dictionary<string, int> pesoDeTerminos = _parser.GetPesoDeTerminosDeIntervencion(intervencion);

            Assert.AreEqual(2, pesoDeTerminos.Count);
            Assert.AreEqual(4, pesoDeTerminos["empleo"]);
            Assert.AreEqual(12, pesoDeTerminos["guerra"]);
        }
    }
}