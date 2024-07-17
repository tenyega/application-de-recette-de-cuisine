import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import NavBar from "./Navbar"
import { NavLink } from "react-router-dom";

interface Recipe {
    id: string;
    title: string;
    time: string;
    img: string;
  }

export default function FavoriteRecipe() {
    const [favData, setFavData] = useState<Recipe[]>([]);
    useEffect(() => {
        async function fetchData() {
          const favorites = JSON.parse(localStorage.getItem('favorite') || '[]') as Recipe[];
          setFavData(favorites);
        }
        fetchData();
      }, []);


    return (
        <>
        <NavBar />
            <h1 className="title"> Your Favorites </h1>
            <div className="CardContainer">

            {favData.map((data: {id: Key , img: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; time: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (

                <div className="card" key={data.id}>
                        <img src={data.img} alt="Example Image" className="card-image" />
                        <button className="star-button" >
                    </button>
                    <div className="card-content">
                        <h2 className="card-title">{data.title}</h2>
                        <p className="card-time">{data.time}</p>
                        </div>
                        <NavLink to={`/recipedetail/${data.id}`} className="btnDetails">
                    Details <img src="https://api.iconify.design/material-symbols:arrow-forward-rounded.svg?color=%23888888" alt="launch" />        
                            </NavLink>
                        
                </div>
            ))}
            </div>
        </>
    )
}