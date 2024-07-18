import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom"
import NavBar from "./Navbar";
interface Detail {
    id: string;
    title: string;
    desc: string;
    ingredients: { [key: string]: string } ;
    steps: { [key: string]: string };
    category: string;
    img: string;
    type: string;
    conseil:string
}


export default function RecipeDetail() {
    let params = useParams();
    
    const [resRecipe, setResRecipe] = useState<Detail |any>({});
    useEffect(() => {
    //Runs only on the first render
 
      
    async function fetchData() {
        try {

            const response = await fetch('https://server-json-ecf.vercel.app/recipe/'+params.id);
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
    
    
  
    return (<>
       <NavBar />
        <section className="mainContainer">
            <h1  className="title">Details of the Recipe </h1>
          
            {resRecipe && (
                    <><div className="detailContainer">
                    <img src={resRecipe.img} alt={resRecipe.title} className="imgDetail" />
                    <div className="infoRecipe">
                        <h2>{resRecipe.title}</h2>
                        <br />
                        <h3>Time :- {resRecipe.time}</h3>
                        <h4>Category:- {resRecipe.category?.toUpperCase()}</h4>
                        <h4>Type of Cuisine:- {resRecipe.type?.toUpperCase()}</h4>
                        <h4>Chef's Advice :- {resRecipe.conseil?.toUpperCase()}</h4>
                        <p className="desc">{resRecipe.desc}</p>
                    </div>
                </div>
                    <h2 className="title"> For 1 portion</h2>
                    <div className="additionalInfo">
                        <ul>INGREDIENTS -<br />
                            {resRecipe.ingredients ? (
                                Object.keys(resRecipe.ingredients).map((key) => (
                                    <li key={key} className="list">
                                        {resRecipe.ingredients[key]}
                                    </li>
                                ))
                            ) : (
                                <li>No ingredients found</li>
                            )}
                        </ul><br />
                        <ul>STEPS -<br />
                            {resRecipe.steps ? (
                                Object.keys(resRecipe.steps).map((key) => (
                                    <li key={key} className="list">
                                        {resRecipe.steps[key]}
                                    </li>
                                ))
                            ) : (
                                <li>No steps found</li>
                            )}
                        </ul>
                    </div></>  
                   
            )}
           
        </section>
        </>
      
    )
}