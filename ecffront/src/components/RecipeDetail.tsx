import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom"
interface Detail {
    id: string;
    title: string;
    desc: string;
    ingredients: {
        id: string;
    };
    step: {
        id: string;
    }
    category: string;
    img: string;
    isFavorite: boolean;
}


export default function RecipeDetail() {
    let params = useParams();
    
    const [resRecipe, setResRecipe] = useState<Detail |any>({});
    useEffect(() => {
    //Runs only on the first render
 
      
    async function fetchData() {
        try {

            const response = await fetch('http://localhost:3000/recipe/'+params.id);
            const datas = await response.json(); 
            if (datas) {
                setResRecipe(datas);

            }
        } catch (err) {
            setResRecipe([]);
        }
    }
 fetchData();


     

}, []);

    return (
       
        <section className="detailContainer">
            <h1>Details of the Recipe </h1>
            <h2>{resRecipe.title}</h2>
            
        </section>
      
    )
}