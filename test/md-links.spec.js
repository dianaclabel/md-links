const { mdLinks } = require("../src/index.js");
const {
  fnIsAbsolute,
  fnConvertToAbsolute,
  veriFyIsFileOrDirectory,
} = require("../src/main.js");

// describe("mdLinks", () => {
//   it("should...", () => {
//     console.log("FIX ME!");
//   });
// });
const pathRelativa = "./files-md/prueba2.md";
const pathDirectory =
  "./files-md";
const pathFile =
  "C:/Users/diana/Documents/Projects/Laboratoria/md-links/files-md/prueba2.md";
const pathFileInvalid =
"C:/Users/diana/Documents/Projects/Laboratoria/md-links/files-md/prueba2.mde";
const pathFileEmpty =
  "C:/Users/diana/Documents/Projects/Laboratoria/md-links/files-md/pruebaEmpty.md";
const pathFileTxt = "C:/Users/diana/Documents/Projects/Laboratoria/md-links/files-md/archivo.txt";
const pathFileLinkIncorrect = "C:/Users/diana/Documents/Projects/Laboratoria/md-links/files-md/pruebaLinksIncorrect.md"
const optionTrue = { validate: true };
const optionFalse = { validate: false };

// FUNCION MD-LINKS QUE RETORNARA DE UNA RUTA FILE UN OBJETO TEXT, HREF Y FILE
describe("funcion que retornara un array de objetos sin el estado de HTTP", () => {
  it("Debería retornar un array con objetos sin incluir el estado de HTTP", (done) => {
    const resultMdLinks = mdLinks(pathFile, optionFalse);
    expect(resultMdLinks)
      .resolves.toEqual([
        {
          text: "Node.js",
          href: "https://nodejs.org/",
          file: "prueba2.md",
        },
      ])
      .then(done);
  });
});

// FUNCION MD-LINKS QUE RETORNARA DE UNA RUTA FILE, UN OBJETO TEXT, HREF, FILE, STATUS Y OK
describe("funcion que retornara un array de objetos incluido el estado de HTTP", () => {
  it("Debería retornar un array con objetos incluido el estado de HTTP", (done) => {
    const resultMdLinks = mdLinks(pathFile, optionTrue);
    expect(resultMdLinks)
      .resolves.toEqual([
        {
          text: "Node.js",
          href: "https://nodejs.org/",
          file: "prueba2.md",
          status: 200,
          ok: "ok",
        },
      ])
      .then(done);
  });
});

// FUNCION MD-LINKS QUE RETORNARA DE UNA RUTA DIRECTORY UN OBJETO TEXT, HREF , FILE , status , ok
describe("funcion que retornara un array de objetos sin el estado de HTTP", () => {
  it("Debería retornar un array con objetos sin incluir el estado de HTTP", () => {
    const resultMdLinks = mdLinks(pathDirectory, optionTrue);
    expect(resultMdLinks)
      .resolves.toEqual([
        {
          text: "Markdown",
          href: "https://es.wikipedia.org/wiki/Markdown",
          file: "prueba.md",
          status: 200,
          ok: "ok",
        },
        {
          text: "Node.js",
          href: "https://nodejs.org/",
          file: "prueba2.md",
          status: 200,
          ok: "ok",
        },
      ])
      ;
  });
});

// FUNCION MD-LINKS QUE RETORNARA DE UNA RUTA DIRECTORY INVALIDA, UN MENSAJE DE ERROR
describe("funcion que retornara un mensaje de error", () => {
  it("Debería retornar un string",(done) => {
    const resultMdLinks = mdLinks(pathFileInvalid, optionFalse);
    expect(resultMdLinks).rejects.toEqual("Rejected: El path ingresado es inválido").then(done);
  });
});

// FUNCION MD-LINKS QUE RETORNARA DE UNA RUTA FILE QUE NO TIENE LINKS UN MENSAJE DE ERROR
describe("funcion que retornara un mensaje de error por no encontrar links", () => {
  it("Debería retornar un string",(done) => {
    const resultMdLinks = mdLinks(pathFileEmpty, optionFalse);
    expect(resultMdLinks).rejects.toEqual("No se encontraron links").then(done);
  });
});

// FUNCION MD-LINKS QUE RETORNARA DE UNA RUTA FILE TXT UN MENSAJE DE ERROR
describe("funcion que retornara un mensaje de error por no ser un md", () => {
  it("Debería retornar un string",(done) => {
    const resultMdLinks = mdLinks(pathFileTxt, optionFalse);
    expect(resultMdLinks).rejects.toEqual("El archivo no es md").then(done);
  });
});

// FUNCION MD-LINKS QUE RETORNARA DE UNA RUTA FILE, LINKS CON STATUS -1 Y OK FAIL
describe("funcion que retornara un array de objetos incluido el estado de HTTP", () => {
  it("Debería retornar un array con objetos incluido el estado negativo de HTTP", (done) => {
    const resultMdLinks = mdLinks(pathFileLinkIncorrect, optionTrue);
    expect(resultMdLinks)
      .resolves.toEqual([
        {
          file: "pruebaLinksIncorrect.md",
       href: "https://nodejs.orppg/",
        ok: "fail",
       status: -1,
       text: "Node.js",
        },
      ])
      .then(done);
  });
});


// FUNCION PARA VERIFICAR SI ES RUTA ABSOLUTA
describe(" funcion para verificar si es una ruta absoluta", () => {
  it("Debería retornar un valor booleano", () => {
    const result = fnIsAbsolute(pathFile);
    expect(result).toEqual(true);
  });
});

// FUNCION PARA VERIFICAR SI ES RUTA ABSOLUTA
describe(" funcion para verificar si es una ruta absoluta", () => {
  it("Debería retornar un valor booleano", () => {
    const result = fnIsAbsolute(pathRelativa);
    expect(result).toEqual(false);
  });
});

// FUNCION PARA CONVERTIR UNA RUTA RELATIVA A ABOSLUTA
describe(" funcion para convertir una ruta relativa a absoluta", () => {
  it("Debería retornar una ruta absoluta", () => {
    const result = fnConvertToAbsolute(pathRelativa);
    expect(result).toEqual(
      "C:\\Users\\diana\\Documents\\Projects\\Laboratoria\\md-links\\files-md\\prueba2.md"
    );
  });
});

// VERIFICAR SI ES UN ARCHIVO
describe(" funcion para verificar que la ruta sea de file", () => {
  it("Debería retornar un string", () => {
    const result = veriFyIsFileOrDirectory(pathFile);
    expect(result).toEqual("file");
  });
});

// VERIFICAR SI ES UN DIRECTORIO
describe(" funcion para verificar que la ruta sea de directorio", () => {
  it("Debería retornar un string", () => {
    const result = veriFyIsFileOrDirectory(pathDirectory);
    expect(result).toEqual("directory");
  });
});
