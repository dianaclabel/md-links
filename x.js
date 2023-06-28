
// function main(ruta) {
//     const tipo = "cajon" // "unidad" | "cajon"
    
//     procesarTipoRuta(ruta, tipo)
//         .then(frutas => {
//             console.log(frutas);
//         })
// }

// function procesarTipoRuta(ruta, tipo) {

//     if (type === "caja") {

//         return revisarCaja(ruta).then(frutasNames => {

//             const procesadoFrutas = frutasNames.map(frutaName => {
//                 return procesarFruta(path.join(ruta, frutaName))//fn readfile -> promesa que debe capturar la rpta con then y cath
//             })

//             return Promise.all(procesadoFrutas)
//         })

//     } else if (type === "unidad") {

//         return procesarFruta(ruta).then(fruta => {
//             const frutas = [];
//             frutas.push(fruta)
//             return frutas;
//         })
        
//     }
    
// }




// const fileNames = ["hola.txt", "chau.txt"]
// const promisesFiles = [readFile("hola.txt"), readFile("chau.txt")];

// Promise.all(promisesFiles).then((contenidos) => {
//     console.log(contenidos[0]);
//     console.log(contenidos[1]);
//     console.log("Fin")
// })


// // const mdText = `
// // # Hola

// // ## Hello

// // Hola mundo aquí entras a [Google](https://google.com) jejeje.
// // Hola mundo aquí entras a [Apple](https://apple.com) jejeje.
// // `

// // const matcher = /[Google](https://google.com)/;

// // Validación
// const pattern = /^[abc][abc][abc]$/
// const result = pattern.test("bc");

// console.log(result);
