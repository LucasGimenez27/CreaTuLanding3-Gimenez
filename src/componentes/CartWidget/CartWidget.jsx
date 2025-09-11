import "./CartWindget.css"
import { useContext } from "react"
import { CarritoContext } from "../../context/CarritoContext"
import { Link } from "react-router-dom"

const CartWidget = () => {

  const {cantidadTotal} = useContext(CarritoContext)

    const imgCarrito = "https://cdn-icons-png.flaticon.com/512/846/846423.png"

  return (
    <div>

      <Link to="/cart">
        <img className="imgCarrito" src={imgCarrito} alt="Imagen del carrito" />
        {
          cantidadTotal > 0 && <strong>{cantidadTotal}</strong>
        }
      
      </Link>


    </div>
  )
}

export default CartWidget