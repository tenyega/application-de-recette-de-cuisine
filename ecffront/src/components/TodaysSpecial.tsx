import { useEffect, useState } from "react";
import NavBar from "./Navbar";
import {  useNavigate } from 'react-router-dom';

interface Data {
    id: string;
    title: string;
    desc: string;
    ingredients:  { [key: string]: string };
    step:  { [key: string]: string };
    category: string;
    img: string;
    isFavorite: boolean;
}
interface Datas {
datas: Data[];
}
export default function TodaysSpecial() {
    const [datas, setDatas] = useState<Datas | any>();
    const [res, setRes] = useState([]);
    const [randomIndex, setRandomIndex] = useState(0);
    let navigate = useNavigate() 



    useEffect(() => {
        //this code runs only when shouldFetch is true (false by default) which means we have typed something in our search bar        
        async function fetchData() {
            try {
                const response = await fetch('https://server-json-ecf.vercel.app/recipe');
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
         
    });



    const getRandomItem = () => {
        if (res.length === 0) return null;
        
        let index=  Math.floor(Math.random() * res.length);
        setRandomIndex(index);
        navigate(`/recipedetail/${randomIndex}`)
        return randomIndex
      };

    return (<>
         <NavBar />
         <section className="mainContainer">
            <h1 className="title">Today's Special</h1>
            <div>{getRandomItem()}</div>
        </section>
    </>)
}