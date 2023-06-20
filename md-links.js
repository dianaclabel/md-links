const path = require("path");

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

// fnConvertToRelative('m-linksREADME.md');







module.exports = {
  fnIsAbsolute, fnConvertToRelative,
};
