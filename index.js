// module.exports = () => {
//   // ...
// };

const { fnIsAbsolute, fnConvertToRelative, verifyRoute, veriFyIsFileOrDirectory } = require("./md-links.js");

// funcion es absoluta
function mdLinks(route) {

  let convertRouteRelative;
  const resultIsAbsolute = fnIsAbsolute(route);
  
  if (resultIsAbsolute){
      const existRoute = verifyRoute(route);
      console.log(existRoute);

      if(existRoute){
        const result = veriFyIsFileOrDirectory(route);
        console.log(result);
        return result;
      }
      
  }else{
   convertRouteRelative = fnConvertToRelative(route);
    mdLinks(convertRouteRelative);
  }
 
}
// En MD-links retornar promesas
mdLinks("C:/Users/diana/Documents/Projects/Laboratoria/md-links/README.md");


