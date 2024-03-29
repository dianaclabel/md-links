const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

// funcion para verificar si es una ruta absoluta
// retorna booleano

function fnIsAbsolute(route) {
  try {
    return path.isAbsolute(route);
  } catch (error) {
    console.log("Error: La ruta no es absoluta ", error);
    return false;
  }
}

// convertira una ruta relativa a absoluta
// retorna  una ruta relativa en string

function fnConvertToAbsolute(route) {
  return path.resolve(route);
}

// verificación de existencia
// retorna booleano

function verifyRoute(route) {
  try {
    fs.accessSync(route);
    return true;
  } catch (error) {
    return false;
  }
}

// Verificar si es un archivo o directorio
//devuelve ub string

function veriFyIsFileOrDirectory(route) {
  try {
    const inspectRoute = path.resolve(route);
    const stats = fs.statSync(inspectRoute); // Obtener información sobre el archivo o directorio especificado (inspectRoute)
    // devuelve un objeto stats, contiene detalles sobre el archivo o directorio.
    if (stats.isFile()) {
      return "file";
    } else if (stats.isDirectory()) {
      return "directory";
    } 
  } catch (error) {
    console.log("Error: Archivo o directorio roto ", error);
  }
}

//Mostrar lista de archivos de un directorio
// retorna el nombre de los archivos

function readDirectory(directoryRoute) {
  // promisify es una funcion de modulo util, convierte en una funcion callback a funcion que devuelve una promesa
  const readdir = promisify(fs.readdir);
  return readdir(directoryRoute);
}

//Leer archivos
// retorna el contenido - data del archivo
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

function readLinks(data) {
  // [Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)

  const iterable = data.matchAll(/\[([^\]]+)\]\(([^\)]+)\)/g);
  // se convierte el iterable en un array
  const results = [...iterable];

  const links = results.map((result) => {
    return { text: result[1], href: result[2] };
  });
  // console.log(links);

  return links;
}

// creacion de ruta con el nombre de archivo iterado
// retorna la ruta del archivo

function createPathFile(route, fileName) {
  return (pathFile = path.join(route, fileName));
}

function validateLink(href) {
  return fetch(href)
    .then((response) => {
      const status = response.status;
      const ok = response.ok ? "ok" : "fail";
      return { status, ok };
    })
    .catch(() => {
      return { status: -1, ok: "fail" };
    });
}

// createPathFile("C:/Users/diana/Documents/Projects/Laboratoria/md-links/files-md","/prueba2.md");
// console.log(veriFyIsFileOrDirectory ("C:/Users/diana/Documents/Projects/Laboratoria/md-links/README.md"));
// console.log( readDirectory("C:/Users/diana/Documents/Projects/Laboratoria/md-links"));

module.exports = {
  fnIsAbsolute,
  fnConvertToAbsolute,
  verifyRoute,
  veriFyIsFileOrDirectory,
  readDirectory,
  readFile,
  readLinks,
  createPathFile,
  validateLink,
};
