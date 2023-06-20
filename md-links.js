const path = require("path");
const fs = require("fs");


// funcion para verificar si es una funcion absoluta

function fnIsAbsolute(route) {
  try {
    return  path.isAbsolute(route);
    
  } catch (error) {
    console.log("Error", error);
  }
}

// convertira a una ruta realtiva a absoluta

function fnConvertToRelative(route){
    return path.resolve(route);  
}

// Validar si la ruta es valida

function verifyRoute(route){
  try {
    // Verificar si la ruta existe, se utiliza poreu la funcion de ex
    fs.accessSync(route);
   return true;
  } catch (error) {
    console.log("Error",'La ruta no existe.');
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
        return 'Archivo';
      } else if(stats.isDirectory()){
        return 'Directorio';
      }else{
        return 'Desconocido';
      }
        } catch (error) {
            console.log('Error: Archivo o directorio roto ', error); 
    //   }
  }
}

//Mostrar lista de archivos





console.log(veriFyIsFileOrDirectory ("C:/Users/diana/Documents/Projects/Laboratoria/md-links/README.md"));


module.exports = {
  fnIsAbsolute, fnConvertToRelative, verifyRoute, veriFyIsFileOrDirectory,
};
