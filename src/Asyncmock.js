const misProductos =[
    {id:1, nombre: "Yerba", precio: 200, img:"../public/img/yerba.jpg", idCat: "almacen", stock: 10},
    {id:2, nombre: "Fideos", precio: 50, img:"../public/img/fideos.jpg", idCat: "almacen", stock: 15},
    {id:3, nombre: "Arroz", precio: 80, img:"../public/img/arroz.jpg", idCat: "lacteos", stock: 25},
    {id:4, nombre: "Aceite", precio: 100, img:"../public/img/aceite.jpg", idCat: "lacteos", stock: 30},
]

export const getProductos = () =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(misProductos)
        }, 2000);
    })
}