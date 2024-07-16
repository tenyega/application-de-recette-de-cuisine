import { NavLink } from "react-router-dom"

export default function NavBar() {
    
    return (
        <>
                <div className="Navbar">
                <ul className="containerNav">
                    <NavLink to="/" className="navlink">
                    <img src="../public/logo.png" className="logo" alt="Recipe Kitchen" height={100} width={100} />

                    </NavLink>
                        <NavLink to='/add' className="NavList">
                            <img src="https://api.iconify.design/material-symbols:add-circle-rounded.svg?color=%23888888" alt="addIcon" className="imgNav" /><br></br>
                            add new Recipe
                        </NavLink>
                        <NavLink  to='/special' className="NavList">
                        <img src="https://api.iconify.design/material-symbols:favorite-outline.svg?color=%23888888" alt="special" className="imgNav"/><br></br>

                            Today's Special
                        </NavLink>
                        <NavLink to='/favorite' className="NavList">
                        <img src="https://api.iconify.design/uil:favorite.svg?color=%23888888" alt="favorite" className="imgNav" /><br></br>
                            Your Favorites 
                        </NavLink>
                    </ul>
                
                    </div>
        </>
    )
}