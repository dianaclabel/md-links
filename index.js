// module.exports = () => {
//   // ...
// };

const { fnIsAbsolute, fnConvertToRelative: fnConvertToAbsolute, verifyRoute, veriFyIsFileOrDirectory, readDirectory } = require("./main.js");

// // funcion es absoluta
// function mdLinks(route, {}) {

//   const resultIsAbsolute = fnIsAbsolute(route);
  
//   if (resultIsAbsolute){

//       let result;

//       // corrobora si la ruta exites
//       const existRoute = verifyRoute(route);
//       console.log("La ruta existe:" + existRoute);

//       if(existRoute){
//         //verifica si es un  archivo o directorio
//         result = veriFyIsFileOrDirectory(route);

//         console.log(result);  
//       }else{
//         console.error("Ruta no exite");
//       }

//       if(result === "directory"){
//         readDirectory(route);
//       }
      
//   }else{
//    const convertRouteRelative = fnConvertToAbsolute(route);
//     mdLinks(convertRouteRelative);
//   }
 
// }

const mdLinks = (path, options) => {
  // Manejo de ruta relativa
  const pathIsAbsolute = fnIsAbsolute(path);
  
  if (!pathIsAbsolute) {
    console.log("false");
    const absoluteVersion = fnConvertToAbsolute(path);
    return mdLinks(absoluteVersion);
  }

  // Verificación de existencia de la ruta
  const pathExists = verifyRoute(path);
  if (!pathExists) {
    console.error("El path ingresado es inválido");
    return;
  }

  const filesMd = [];

  const pathType = veriFyIsFileOrDirectory(path);

  if(pathType === "directory"){
    const fileNames = readDirectory(path);
    fileNames.then(files => {

      files.forEach(file => {
        
      if(!file.endsWith(".md")) return;
      const fileContent = readSingleFileAsText(path.join(path, fileName));
      filesMd.push(fileContent)
      }) 

      if (filesMd.length === 0) {
        console.error("No se encontraron achivos .md");
        return;
      }
    })
    .catch(error => {
      console.log('Error al obtener los archivos:', error);
    });
  }else if (pathType === "file") {

    if (!path.endsWith(".md")) {
      console.error("El archivo no es md");
      return;
    }
    const fileContent = readSingleFileAsText(path);
      files.push(fileContent)
  }

    


  // console.log("true");

}




// En MD-links retornar promesas
// mdLinks("C:/Users/diana/Documents/Projects/Laboratoria/md-links");

mdLinks("Projects/Laboratoria/md-links")
