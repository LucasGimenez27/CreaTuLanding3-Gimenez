import "./NavBar.css"
import CartWidget from '../CartWidget/CartWidget'
import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
  return (
 <header>
    <Link to="/">
    <img className="logoMarolio" src={"../../../public/img/logo.png"} alt="Logo LGez" style={{ width: "120px", height: "auto" }} />
    </Link>

    <nav>
        <ul>
            <li>
              <NavLink to="categoria/lacteos">
                Lacteos
              </NavLink>
            </li>
            <li>
              <NavLink to="categoria/almacen">
                Almacen 
              </NavLink>
            </li>
        </ul>
    </nav>


    <CartWidget/>
</header>



  )
}

export default NavBar