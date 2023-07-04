const {
  fnIsAbsolute,
  fnConvertToAbsolute,
  verifyRoute,
  veriFyIsFileOrDirectory,
  readDirectory,
  readFile,
  createPathFile,
  readLinks,
} = require("./main.js");

function mdLinks(path) {
  // Manejo de ruta relativa
  const pathIsAbsolute = fnIsAbsolute(path);

  if (!pathIsAbsolute) {
    const absoluteVersion = fnConvertToAbsolute(path);
    console.log("se covierte a ruta absoluta: " + absoluteVersion);
    return mdLinks(absoluteVersion);
  }

  // Verificación de existencia de la ruta
  const pathExists = verifyRoute(path);
  console.log("La ruta existe: " + pathExists);

  if (!pathExists) {
    console.error("El path ingresado es inválido");
    return;
  }

  const pathType = veriFyIsFileOrDirectory(path);
  console.log("La ruta es de tipo: " + pathType);

  readFileOrDirectory(path, pathType)
    .then((links) => {
      console.log(links);
    })
    .catch((error) => {
      console.log("Error al obtener los archivos:", error);
    });
}

function readFileOrDirectory(path, pathtype) {
  if (pathtype === "directory") {
    return readDirectory(path).then((fileNames) => {
      // array de nombres de archivos
      console.log("Nombres de los archivos de directorio: ", fileNames);

      const promisesFilesLinks = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
          let pathFile = createPathFile(path, fileName);
          console.log("Ruta de archivo creada:", pathFile);
          //retorna la data - el contenido de archivo en string
          return readFile(pathFile).then((data) => {
            // Array de links (text, href)
            const links = readLinks(data);
            //retornara text , href y filename
            return links.map((link) => {
              return { ...link, file: fileName };
            });
          });
        });

      //Se retorna todas las promesas
      return Promise.all(promisesFilesLinks);
    });
  } else if (pathtype === "file") {
    if (!path.endsWith(".md")) {
      console.error("El archivo no es md");
      return;
    }

    return readFile(path)
      .then((data) => {
        // Array de links
        const links = readLinks(data);
        //retornara text , href y filename
        return links.map((link) => {
          return { ...link, file: path.split("/").at(-1) };
        });
      })
      .catch((error) => console.log("Este archivo no se puede leer", error));
  }
}

mdLinks(
  "C:/Users/diana/Documents/Projects/Laboratoria/md-links/test/files-md/"
);
