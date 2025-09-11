import { useState } from "react"

const ItemCount = ({inicial, stock, funcionAgregar}) => {

    const [contador, setContador] = useState(1)

    const incrementar = () => {
        if(contador < stock){
            setContador(contador + 1)
        }
        
    }
 
    const decrementar = () => {
        if(contador > inicial) {
            setContador(contador - 1)
        }
    }



  return (
            <>
            <div>
                <h2>Contador</h2>
                <button onClick={incrementar}> + </button>
                <p>{contador}</p>
                <button onClick={decrementar}> - </button>
            </div>
            <div>
                <button onClick={()=>funcionAgregar(contador)}> Agregar al carrito</button>
            </div>
            
            
            </>
            
  )
}

export default ItemCount