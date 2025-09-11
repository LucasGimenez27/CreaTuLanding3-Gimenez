//Version Simple

/* import { useContext, useState } from "react"
import { CarritoContext } from "../../context/CarritoContext"
import {db} from "../../services/config"
import {collection, addDoc} from "firebase/firestore"


const Checkout = () => {

    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [emailConfirmacion, setEmailConfirmacion] = useState("")
    const [error, setError] = useState("")
    const [ordenId, setOrdenId] = useState("")

    const {carrito, vaciarCarrito, total, totalCantidad} = useContext(CarritoContext)


    //funciones y validacion

    const manejadorFormulario = (event) => {
        event.preventDefault();

        //verificamos que los campos esten completos:
        if(!nombre || !apellido || !telefono || !email || !emailConfirmacion){
            setError("Por favor completá todos los campos o vete maldito insecto!!")
            return
        }

        if(email !== emailConfirmacion) {
            setError("Los campos de email no coinciden, maldito!")
            return
        }
    

    //1) creamos un objeto con todos los datos de la orden de compra:

    const orden = {
        items: carrito.map (producto => ({
            id: producto.item.id,
            nombre: producto.item.nombre,
            cantidad: producto.cantidad
        })),
        total: total,
        fecha: new Date(),
        nombre,
        apellido,
        telefono,
        email
    }

    //2) Guardar la oden en la base de datos:

    addDoc(collection(db, "ordenes"), orden)
        .then(docRef => {
            setOrdenId(docRef.id)
            vaciarCarrito()
        })
        .catch(error => {
            console.log("Error al crear la orden", error)
            setError("Se produjo un error al crear la orden!!")
        })
    



}




  return (
    
    <div>
        <h2>Checkout</h2>

        <form onSubmit={manejadorFormulario}>
            {
                carrito.map(producto=> (
                    <div key={producto.item.id}>
                        <p>{producto.item.nombre} x {producto.cantidad}</p>
                        <p>{producto.item.precio}</p>
                        <hr />
                    </div>
                    
                ))
            }
            <div>
                <label htmlFor="">Nombre</label>
                <input type="text" onChange={(e) => setNombre(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Apellido</label>
                <input type="text" onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Telefono</label>
                <input type="text" onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Email Confirmacion</label>
                <input type="email" onChange={(e) => setEmailConfirmacion(e.target.value)}/>
            </div>
            {
                error && <p style={{color: "red"}}>{error}</p>
            }

            <button type="submit">Confirmar Compra</button>
            {
                ordenId && (
                    <strong>Gracias por tu compra!! Tu numero de orden es: {ordenId}</strong>
                )
            }


        </form>

    </div>
  )
}

export default Checkout */


//VERSION CON DESCUENTO DE STOCK


import { useContext, useState } from "react"
import { CarritoContext } from "../../context/CarritoContext"
import {db} from "../../services/config"
import {collection, addDoc, updateDoc, doc, getDoc} from "firebase/firestore"


const Checkout = () => {

    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [emailConfirmacion, setEmailConfirmacion] = useState("")
    const [error, setError] = useState("")
    const [ordenId, setOrdenId] = useState("")

    const {carrito, vaciarCarrito, total, totalCantidad} = useContext(CarritoContext)


    //funciones y validacion

    const manejadorFormulario = (event) => {
        event.preventDefault();

        //verificamos que los campos esten completos:
        if(!nombre || !apellido || !telefono || !email || !emailConfirmacion){
            setError("Por favor completá todos los campos o vete maldito insecto!!")
            return
        }

        if(email !== emailConfirmacion) {
            setError("Los campos de email no coinciden, maldito!")
            return
        }
    

    //1) creamos un objeto con todos los datos de la orden de compra:

    const orden = {
        items: carrito.map (producto => ({
            id: producto.item.id,
            nombre: producto.item.nombre,
            cantidad: producto.cantidad
        })),
        total: total,
        fecha: new Date(),
        nombre,
        apellido,
        telefono,
        email
    }

    ////////////////////////////////////////////////////////////////

    //Vasmoa a modificar el codigo par aque ejecute varias promesas en paralelo, por un lado que actualice el stock de productos y pro otro lado que genere una orden de compra
    // Vamos a usar para lograr esto: Promise.All


    Promise.all(
        orden.items.map( async (productoOrden)=>{
            const productoRef = doc(db, "productos", productoOrden.id)
            //Por cada producto en la coleccion "productos" obtengo una referencia, y a aprtir de esa referencia obtengo el DOC
            const productoDoc= await getDoc(productoRef)
            const stockActual = productoDoc.data().stock
            //Data es una método que me permite acceder a la informacion del documento

            await updateDoc (productoRef, {
                stock: stockActual - productoOrden.cantidad
            })
            //Modifico el stock y subo la infomracion actualizada
        })

    )
    .then(()=>{
        //guardamos la orden en la base de datos:
        addDoc(collection(db, "ordenes"), orden)
            .then(docRef => {
                setOrdenId(docRef.id)
                vaciarCarrito()
            })
            .catch(error => {
                console.log("Error al crear la orden", error)
                setError("Se produjo un error al crear la orden!!")
            })
    })
    .catch((error)=>{
        console.log("No se pudo actualizar el stock", error)
        setError("No se puede actualizar el stock, intente en el supermercado Vital")
    })

}




  return (
    
    <div>
        <h2>Checkout</h2>

        <form onSubmit={manejadorFormulario}>
            {
                carrito.map(producto=> (
                    <div key={producto.item.id}>
                        <p>{producto.item.nombre} x {producto.cantidad}</p>
                        <p>{producto.item.precio}</p>
                        <hr />
                    </div>
                    
                ))
            }
            <div>
                <label htmlFor="">Nombre</label>
                <input type="text" onChange={(e) => setNombre(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Apellido</label>
                <input type="text" onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Telefono</label>
                <input type="text" onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Email Confirmacion</label>
                <input type="email" onChange={(e) => setEmailConfirmacion(e.target.value)}/>
            </div>
            {
                error && <p style={{color: "red"}}>{error}</p>
            }

            <button type="submit">Confirmar Compra</button>
            {
                ordenId && (
                    <strong>Gracias por tu compra!! Tu numero de orden es: {ordenId}</strong>
                )
            }


        </form>

    </div>
  )
}

export default Checkout