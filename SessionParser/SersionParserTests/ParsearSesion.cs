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

            IList<string> intervenciones = parser.ParsearIntervenciones(rawData);

            Assert.AreEqual(2, intervenciones.Count);
            
            Assert.IsTrue(intervenciones[0].StartsWith("xxx:"));
            Assert.IsTrue(intervenciones[0].EndsWith("fin"));

            Assert.IsTrue(intervenciones[1].StartsWith("yyy:"));
            Assert.IsTrue(intervenciones[1].EndsWith("fin2"));
        }


    }
}
