using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Parser;

namespace SersionParserTests
{
    [TestClass]
    public class NormalizarIntervenciones
    {
        #region Atributos de prueba adicionales
        //
        // Puede usar los siguientes atributos adicionales conforme escribe las pruebas:
        //
        // Use ClassInitialize para ejecutar el código antes de ejecutar la primera prueba en la clase
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup para ejecutar el código una vez ejecutadas todas las pruebas en una clase
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // Usar TestInitialize para ejecutar el código antes de ejecutar cada prueba 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup para ejecutar el código una vez ejecutadas todas las pruebas
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion

        private SesionParser _parser;

        [TestInitialize]
        public void TestInitialize()
        {
            _parser = new SesionParser();
        }

        [TestMethod]
        public void Normalizar_intervenciones_de_un_hombre()
        {
            string rawData = "<br>el señor XXXX: asdf";
            Assert.AreEqual("<inicio_intervencion> xxxx: asdf", _parser.NormalizarIntervenciones(rawData));
        }

        [TestMethod]
        public void Normalizar_intervenciones_de_dos_hombres()
        {
            string rawData = "<br>el señor XXXX: asdf<br>asdfas<br>el señor YYYY: asdfas";

            int totalCoincidencias =
                new Regex("<inicio_intervencion>")
                    .Matches(_parser.NormalizarIntervenciones(rawData)).Count;

            Assert.AreEqual(2, totalCoincidencias);
        }

        [TestMethod]
        public void Normalizar_intervencion_de_una_mujer()
        {
            string rawData = "<br>la señora XXXX: asdf";
            Assert.AreEqual("<inicio_intervencion> xxxx: asdf", _parser.NormalizarIntervenciones(rawData));
        }
    }
}
