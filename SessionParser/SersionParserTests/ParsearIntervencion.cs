using Microsoft.VisualStudio.TestTools.UnitTesting;
using Parser;

namespace SersionParserTests
{
    [TestClass]
    public class ParsearIntervencion
    {
        [TestMethod]
        public void Obtener_datos_de_una_intervencion()
        {
            string rawIntervencion = " y\nyy: asdf<br>asdf  ";

            IntervencionParser parser = new IntervencionParser();
            Intervencion intervencion = parser.ParsearIntervencion(rawIntervencion);

            Assert.AreEqual("yyy", intervencion.NombreDiputado);
            Assert.AreEqual("asdf<br>asdf", intervencion.Texto);
        }

        [TestMethod]
        public void Ignorar_el_cargo_y_quedarse()
        {
            string rawIntervencion =
                "DIRECTOR GERENTE DEL INSTITUT GUTTMANN (Ramírez Ribas): asdfasfd <br>asdfasf";

            IntervencionParser parser = new IntervencionParser();
            Intervencion intervencion = parser.ParsearIntervencion(rawIntervencion);

            Assert.AreEqual("Ramírez Ribas", intervencion.NombreDiputado);
        }
    }
}
