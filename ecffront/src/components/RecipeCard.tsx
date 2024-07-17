import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import StarIcon from "./FavoriteIcon";

interface Data {
    id: string;
    title: string;
    desc: string;
    ingredients:  { [key: string]: string };
    step:  { [key: string]: string };
    category: string;
    img: string;
    type: string;
}
interface Datas {
datas: Data[];
}

export default function RecipeCard() {
    const [datas, setDatas] = useState<Datas | any>();
    const [res, setRes] = useState([]);
    const [searchTxt, setSearchTxt] = useState('');
    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        //this code runs only when shouldFetch is true (false by default) which means we have typed something in our search bar        
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/recipe');
                setDatas(await response.json());
                if (datas) {
                    setRes(datas);
                    console.log(datas);
  
                }
            } catch (err) {
                setRes([]);
            }
        }
        fetchData();
         
    },[]);
    
    useEffect(() => {
        //this code runs only when shouldFetch is true (false by default) which means we have typed something in our search bar        
          async function fetchData() {
              try {
                  const response = await fetch('http://localhost:3000/recipe');
                  setDatas(await response.json()) ; 
                  if (datas) {
                      setRes(datas);
  
                  }
              } catch (err) {
                setRes([]);
              }
          }
           fetchData();
           //Sets the shouldFetch to false after each fetch data. 
           if (shouldFetch) {
              fetchData();
              setShouldFetch(false);
          }
    }, [shouldFetch]);
    
    useEffect(() => {
        if (datas) {
            const filtered = datas.filter((item: { title: string; }) => item.title.toLowerCase().includes(searchTxt));
            setRes(filtered);
        }
    }, [datas]);

    const handleChange = async(e: { target: { value: any; }; }) => {
        const value = e.target.value;
        setSearchTxt(value)
        setShouldFetch(true);
      
    }

    return (<>
        <div className="search">
        <input
          type="text"
          id="textInput"
                value={searchTxt}
                onChange={handleChange}
                className="searchBar"
            />
            <img src="https://api.iconify.design/pepicons-pencil:loop.svg?color=%23888888" alt="loop" className="loop"/>
                    <label htmlFor="textInput" >Search</label>

        {/* <p>Current value: {inputValue}</p> */}
      </div>
        <div className="CardContainer">
        {res.map((data: {id: Key , img: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; time: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (

        <div className="card" key={data.id}>
                <img src={data.img} alt="Example Image" className="card-image" />
                <button className="star-button" >
                <StarIcon id={data.id?.toString()} dataId={data.id?.toString()} />
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
    );
}



