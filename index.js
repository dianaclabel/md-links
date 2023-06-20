// module.exports = () => {
//   // ...
// };

const { fnIsAbsolute, fnConvertToRelative } = require("./md-links.js");

// funcion es absoluta
function mdLinks(route) {

  const trueIsAbsolute = fnIsAbsolute(route);
  
  if (trueIsAbsolute){
    return trueIsAbsolute
  }else{
  const convertRouteRelative = fnConvertToRelative(route);
    mdLinks(convertRouteRelative);
  }
 
}

mdLinks('C:/Users/diana/Documents/Projects/Laboratoria/md-links/README.md');
