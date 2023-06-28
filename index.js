const { fnIsAbsolute , fnConvertToAbsolute, verifyRoute, veriFyIsFileOrDirectory, readDirectory , readFile , createPathFile, readLinks } = require("./main.js");

function mdLinks(path){
    // Manejo de ruta relativa
  const pathIsAbsolute = fnIsAbsolute(path);
  
  if (!pathIsAbsolute) {
    const absoluteVersion = fnConvertToAbsolute(path);
    console.log("se covierte a ruta absoluta: "+ absoluteVersion)
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
    .then(links => {
      console.log(links);
    })
    .catch(error => {
      console.log('Error al obtener los archivos:', error);
    });;

}

function readFileOrDirectory(path, type){
    if(type === "directory"){
        
         return readDirectory(path)
          .then(fileNames => {
              // array de nombres de archivos
              console.log("Nombres de los archivos de directorio: ", fileNames);

              const promisesFilesLinks = fileNames
                .filter(fileName => fileName.endsWith(".md"))
                .map(fileName => {
                  let pathFile = createPathFile(path, fileName);
                  console.log("Ruta de archivo creada:", pathFile);
                  //retorna los links del archivo
                  return readFile(pathFile).then(data => readLinks(data))
                }) 

                //Se retorna todas las promesas
              return Promise.all(promisesFilesLinks);

            })
        
        
    }else if (type === "file") {
    
        if (!path.endsWith(".md")) {
          console.error("El archivo no es md");
          return;
        }
    
        return readFile(path)
        .then(data => readLinks(data))
        .catch(error => console.log('Este archivo no se puede leer',error))
    } 
          
}


mdLinks("C:/Users/diana/Documents/Projects/Laboratoria/md-links/files-md");




