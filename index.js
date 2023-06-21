// module.exports = () => {
//   // ...
// };

const { fnIsAbsolute, fnConvertToRelative, verifyRoute, veriFyIsFileOrDirectory } = require("./md-links.js");

// funcion es absoluta
function mdLinks(route) {

  
  const resultIsAbsolute = fnIsAbsolute(route);
  
  if (resultIsAbsolute){

      let result;

      // corrobora si la ruta exites
      const existRoute = verifyRoute(route);
      console.log(existRoute);

      if(existRoute){
        //verifica si es un  archivo o directorio
        result = veriFyIsFileOrDirectory(route);
        console.log(result);
        return result;
      }else{
        console.error("Ruta no exite", Error);
      }

      if(result === "directory"){
        readDirectory(route);
      }
      
  }else{
   const convertRouteRelative = fnConvertToRelative(route);
    mdLinks(convertRouteRelative);
  }
 
}
// En MD-links retornar promesas
mdLinks("C:/Users/diana/Documents/Projects/Laboratoria/md-links");


