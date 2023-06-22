const mdLinks = (path, options) => {

  // Manejo de ruta relativa
  if (isPathRelative(path)) {
    const absoluteVersion = convertToAbsolute(path);
    return mdLinks(absoluteVersion);
  }

  // Manejo de ruta absoluta

  // Verificación de existencia
  const pathExists = verifyRoute(path);

  if (!pathExists) {
    console.error("El path ingresado es inválido");
    return;
  }

  const pathType = veriFyIsFileOrDirectory(path);

  const files = [];

  if(pathType === "directory"){
    const fileNames = readDirectoryFilenames(path);
    for (const fileName of fileNames) {
      if (!fileName.endsWith(".md")) continue;
      const fileContent = readSingleFileAsText(path.join(path, fileName));
      files.push(fileContent)
    }

    if (files.length === 0) {
      console.error("No se encontraron achivos .md");
      return;
    }

  } else {
    
    if (!path.endsWith(".md")) {
      console.error("El archivo no es md");
      return;
    }
    const fileContent = readSingleFileAsText(path);
      files.push(fileContent)
  }

  // Sacar links de los files

  const links = [];


  // Proceso

  return links;
}



module.exports = mdLinks;