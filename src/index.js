const {
  fnIsAbsolute,
  fnConvertToAbsolute,
  verifyRoute,
  veriFyIsFileOrDirectory,
  readDirectory,
  readFile,
  createPathFile,
  readLinks,
  validateLink,
} = require("./main.js");

const mdLinks = (path, options = {}) => {
  // Manejo de ruta relativa
  const pathIsAbsolute = fnIsAbsolute(path);

  if (!pathIsAbsolute) {
    const absoluteVersion = fnConvertToAbsolute(path);
    console.log("se covierte a ruta absoluta: " + absoluteVersion);
    return mdLinks(absoluteVersion, options);
  }

  // Verificación de existencia de la ruta
  const pathExist = verifyRoute(path);
  console.log("La ruta existe: " + pathExist);

  if (!pathExist) {
    return new Promise((resolve, reject) => {
       reject("Rejected: El path ingresado es inválido");
    });
  }

  const pathType = veriFyIsFileOrDirectory(path);
  console.log("La ruta es de tipo: " + pathType);

  return readFileOrDirectory(path, pathType).then((links) => {
    if(links.length === 0){
      return Promise.reject("No se encontraron links")
    }

    if (options.validate) {
      const arrPromesas = links.map((link) => {
        // validar el link (status y ok)
        return validateLink(link.href).then((validation) => {
          // retornara un objeto con las 5 propiedades ( text, href, file, status, ok)
          return { ...link, ...validation };
        });
      });
      return Promise.all(arrPromesas);
    } else {
      return links;
    }
  });
};

function readFileOrDirectory(path, pathtype) {
  if (pathtype === "directory") {
    return readDirectory(path).then((fileNames) => {
      // array de nombres de archivos
      console.log("Nombres de los archivos de directorio: ", fileNames);

      const promisesFilesLinks = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
          // se crea ruta de archivo 
          let pathFile = createPathFile(path, fileName);
          console.log("Ruta de archivo creada:", pathFile);
          //lee el archivo y retorna la data - el contenido de archivo en string
          return readFile(pathFile).then((data) => {
            // Array de links (text, href)
            const links = readLinks(data);
            //links es un array de objetos
            //retornara text , href y filename
            return links.map((link) => {
              return { ...link, file: fileName };
            });
          });
        });

      //Se retorna todas las promesas
      return Promise.all(promisesFilesLinks).then((arrLinks) =>
        arrLinks.flat()
      );
    });
  } else if (pathtype === "file") {
    if (!path.endsWith(".md")) {
      return Promise.reject("El archivo no es md");
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
  }
}

//---------------------------------------------------------------------------------

// mdLinks("C:/Users/diana/Documents/Projects/Laboratoria/md-linksn/files-md", {
//   validate: true,
// })
//   .then((links) => {
//     console.log(links);
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch((e) => console.error(e));

//ruta directorio no existe :  "C:/Users/diana/Documents/Projects/Laboratoria/md-linksn/files-md"
//ruta de archivo : "C:/Users/diana/Documents/Projects/Laboratoria/md-links/files-md/prueba2.md"
//ruta de directorio : "C:/Users/diana/Documents/Projects/Laboratoria/md-links/files-md"

module.exports = { mdLinks };
