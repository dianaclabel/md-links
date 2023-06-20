// module.exports = () => {
//   // ...
// };

const { fnIsAbsolute } = require("./md-links.js");

// funcion es absoluta
function mdLinks(route) {
  const result = fnIsAbsolute(route);
  console.log(result);
}

mdLinks('C:/Users/diana/Documents/Projects/Laboratoria/md-links/README.md');
