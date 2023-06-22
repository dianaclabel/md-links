const path = require("path");
const fs = require("fs");
const { promisify } = require('util');


// funcion para verificar si es una ruta absoluta
// retorna booleano

function fnIsAbsolute(route) {
  try {
    return  path.isAbsolute(route);
    
  } catch (error) {
    console.log('Error: La ruta no es absoliuta ', error); 
  }
}

// convertira una ruta relativa a absoluta
// retorna  una ruta relativa en string

function fnConvertToAbsolute(route){
    
    return path.resolve(route);  
}

// verificación de existencia
// retorna booleano

function verifyRoute(route){
  try {
    fs.accessSync(route);
   return true;
  } catch (error) {
    return false
  }
}

// Verificar si es un archivo o directorio

function veriFyIsFileOrDirectory (route){
  try {
    const inspectRoute = path.resolve(route);
    const stats = fs.statSync(inspectRoute); // Obtener información sobre el archivo o directorio especificado (inspectRoute)
     // devuelve un objeto stats, contiene detalles sobre el archivo o directorio.
    if (stats.isFile()) {
        return 'file';
    } else if(stats.isDirectory()){
        return 'directory';
    }else{
        return 'Desconocido';
    }
  } catch (error) {
            console.log('Error: Archivo o directorio roto ', error); 
  }
}

//Mostrar lista de archivos de un directorio

function readDirectory (directoryRoute){
  // promisify es una funcion de modulo util, convierte en una funcion callback a funcion que devulve una promesa
  const readdir = promisify(fs.readdir);
  return readdir(directoryRoute)
  // .then(files => {
  //   console.log(files) // es un array
  //   files.forEach(file => {
  //       return file
  //   });
  // })
  // .catch(error => {
  //   console.log('Error al obtener los archivos:', error);
  // });
}

//Leer archivos 




// console.log(veriFyIsFileOrDirectory ("C:/Users/diana/Documents/Projects/Laboratoria/md-links/README.md"));
// console.log( readDirectory("C:/Users/diana/Documents/Projects/Laboratoria/md-links"));



module.exports = {
  fnIsAbsolute, fnConvertToRelative: fnConvertToAbsolute, verifyRoute, veriFyIsFileOrDirectory, readDirectory
};
