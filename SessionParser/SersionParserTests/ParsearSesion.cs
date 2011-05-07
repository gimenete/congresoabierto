using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Parser;

namespace SersionParserTests
{
    [TestClass]
    public class ParsearSesion
    {
        [TestMethod]
        public void Obtener_intervenciones_en_bruto()
        {
            string rawData = "foo<br>el señor XXX: asdf<br>asdf fin<br>la señora YYY: fin2";
            SessionParser parser = new SessionParser();

            IntervencionCollection intervenciones = parser.ParsearIntervenciones(rawData);

            Assert.AreEqual(2, intervenciones.Count);
            
            Assert.AreEqual("xxx", intervenciones[0].NombreDiputado);
            Assert.AreEqual("asdf<br>asdf fin", intervenciones[0].Texto);

            Assert.AreEqual("yyy", intervenciones[1].NombreDiputado);
            Assert.AreEqual("fin2", intervenciones[1].Texto);
        }


    }
}
