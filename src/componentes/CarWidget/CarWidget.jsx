import "./CarWidget.css"

const CarWidget = () => {
    const imgCarrito = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQ0MFb5_oIDuYrlKxp7qYyhJvG2RXUeCXPQ&s"
  return (
    <>
    <img className="imgCarrito" src={imgCarrito} alt="Carro Compras"/>
    </>
  )
}

export default CarWidget