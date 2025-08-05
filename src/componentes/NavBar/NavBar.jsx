import "./NavBar.css"
import CarWidget from '../CarWidget/CarWidget'

const NavBar = () => {
  return (
     <>

     <header>
        <h1>Tienda maro</h1>

        <nav>
            <ul>
                <li>Lacttos</li>
                <li>Bebidas</li>
                <li>Almacen</li>
            </ul>
        </nav>




        <CarWidget/>
     </header>




     </>
  )
}

export default NavBar