
function main(ruta) {
    const tipo = "cajon" // "unidad" | "cajon"
    
    procesarTipoRuta(ruta, tipo)
        .then(frutas => {
            console.log(frutas);
        })
}

function procesarTipoRuta(ruta, tipo) {

    if (type === "caja") {

        return revisarCaja(ruta).then(frutasNames => {

            const procesadoFrutas = frutasNames.map(frutaName => {
                return procesarFruta(path.join(ruta, frutaName))
            })

            return Promise.all(procesadoFrutas)
        })

    } else if (type === "unidad") {

        return procesarFruta(ruta).then(fruta => {
            const frutas = [];
            frutas.push(fruta)
            return frutas;
        })
        
    }
    
}




const fileNames = ["hola.txt", "chau.txt"]
const promisesFiles = [readFile("hola.txt"), readFile("chau.txt")];

Promise.all(promisesFiles).then((contenidos) => {
    console.log(contenidos[0]);
    console.log(contenidos[1]);
    console.log("Fin")
})
