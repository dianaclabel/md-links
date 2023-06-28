
// module.exports = () => {
//   // ...
// };

const { fnIsAbsolute , fnConvertToAbsolute, verifyRoute, veriFyIsFileOrDirectory, readDirectory , readFile , createPathFile } = require("./main.js");

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
  
  let filesMd = [];
  if(pathType === "directory"){
    //retorna un array de nombres de archivos
     readDirectory(path)
      .then(fileNames => {

        fileNames.forEach(fileName => {

          if(!fileName.endsWith(".md")) return;

          let pathFile =createPathFile(path, fileName);
          console.log(pathFile);

          readFile(pathFile)
          .then(data => {
            filesMd.push(data);
            console.log(data)})
          .catch(error => console.log('Este archivo no se puede leer',error))
          // const fileContent = readSingleFileAsText(path.join(path, fileName));
          // filesMd.push(fileContent)
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

    readFile(path)
    .then(data => {
        filesMd.push(data);
        console.log(data)})
    .catch(error => console.log('Este archivo no se puede leer',error))
      } 
      
  console.log(filesMd)

};



// En MD-links retornar promesas
// mdLinks("C:/Users/diana/Documents/Projects/Laboratoria/md-links");

mdLinks("files-md/prueba.md")
