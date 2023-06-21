// module.exports = () => {
//   // ...
// };

const { fnIsAbsolute, fnConvertToRelative, verifyRoute, veriFyIsFileOrDirectory, readDirectory } = require("./md-links.js");

// funcion es absoluta
function mdLinks(route) {

  
  const resultIsAbsolute = fnIsAbsolute(route);
  
  if (resultIsAbsolute){

      let result;

      // corrobora si la ruta exites
      const existRoute = verifyRoute(route);
      console.log("La ruta existe:" + existRoute);

      if(existRoute){
        //verifica si es un  archivo o directorio
        result = veriFyIsFileOrDirectory(route);

        console.log(result);  
      }else{
        console.error("Ruta no exite");
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
// mdLinks("C:/Users/diana/Documents/Projects/Laboratoria/md-links");

mdLinks("C:/Users/diana/Documents/Projects/Laboratoria/md-links/md-links.js")
